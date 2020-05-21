const express = require('express')
const moment = require('moment')
const { hash, verifyHash, verify, sign } = require('../utils/rsa.signature')
const pgp = require('../utils/pgp.signature')
const rsa = require('../utils/rsa.signature')
const { SECRET_TOKEN, OTP, PGP_URL_TRANFER, 
  RSA_URL_TRANFER,PGP_PARTNERCODE, RSA_PARTNERCODE, SECRET_RSA } = require('../config')
const mailController = require('../mailer/mail.controller')
const transferModel = require('../models/transfer.model')
const notifyModel = require('../models/notify.model')
const debtModel = require('../models/debt.model')
const { getReceiverById, getIdByAccountNum } = require('../models/account.model')
const { htmlMsgTemplate, msgTemplate } = require('../utils/common')
const { minusTransfer, plus, patch } = require('../utils/db')
const bankingAccountModel = require('../models/bankingAccount.modal')
const {broadcastAll} = require('../ws');
const router = express.Router()
const partnerCode = 5412
const encoding = 'base64'
const bcrypt = require('bcryptjs')

const axios = require("axios")

const validateData = (data) => {
  if (!data.to_account) return false;
  if (!data.amount) return false;
  return true
}

const tranferPgp = async transaction => {

  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      STTTH:`${transaction.to_account}`,
      Time: `${parseInt(ts / 1000)}`,
      STTTHAnother: `${transaction.from_account}`,
      Money: `${transaction.amount}`,
      PartnerCode: `0725`
  }

  const UrlApi = PGP_URL_TRANFER
  let signature  =  await pgp.signUtf8(JSON.stringify(data))
  data.Signature = Buffer.from(signature).toString(encoding)
  data.Hash = bcrypt.hashSync(`${data.STTTH}${data.STTTHAnother}${data.PartnerCode}${data.Time}${data.Money}Nhom6`)
  // console.log(data)
  return await axios.post(UrlApi, data)
}


// const tranferRSA = async transaction => {
//   const data = {
//     from: `${transaction.acc_name}`,
//     fromAccountNumber: `${transaction.from_account}`,
//     toAccountNumber: `${transaction.to_account}`,
//     amount: to_account.amount,
//     description: 'Chuyển liên ngân hàng',
//     ts: Date.now(),
//     recvWindow: 5000,
// }
//   const UrlApi = RSA_URL_TRANFER
//   let signature  =  await rsa.sign(JSON.stringify(data)) //JSON.stringify(data)
//   data.sign = Buffer.from(signature).toString('base64')
//   let hash = await rsa.hash(JSON.stringify(data))
//   data.hash = hash
//   // console.log(data)
//   return axios.post(UrlApi, data)
// }


const tranferRSA = async transaction => {
  const data = {
    from: `${transaction.acc_name}`,
    fromAccountNumber: `${transaction.from_account}`,
    toAccountNumber: `${transaction.to_account}`,
    amount: transaction.amount,
    description: 'Chuyển liên ngân hàng',
    ts: Date.now(),
    recvWindow: 5000,
}
  const UrlApi = RSA_URL_TRANFER
  const body = {
    data: data, // Request data
    // hash: hash(JSON.stringify(data), SECRET_RSA), // Chuỗi hash lại của request data (đã chuyển thành JSON string) bằng secret key của quý đối tác, 
    partnerId: `${RSA_PARTNERCODE}` // Partner Id của đối tác, được cung cấp khi 2 bên liên kết với nhau
  }

  let signature  =  await sign(JSON.stringify(data)) //JSON.stringify(data)
  body.sign = Buffer.from(signature).toString('base64')
  let hashval = await hash(JSON.stringify(data), SECRET_RSA )
  body.hash = hashval
  // console.log(data)
  return await axios.post(UrlApi, body)
}

/**
 * logic chung, chuyển tiền liên ngân hàng,
 * bước 1: tạo 1 transaction chuyển tiền, tạo mã OTP
 * bước 2: user verify OTP thành công
 * buóc 3: thực hiện gọi các api bên ngoài ngân hàng chờ chữ ký trả về
 * bước 4: veryfy chữ ký.
 * bước 5. lưu lại và charge tiền
 */


router.post('/', async (req, res) => {
  const type = req.body.type ? req.body.type : 1
  if (!req.body.to_account) {
    req.body.to_account = 100001
  }
  console.log(req.body)
  const isValid = validateData(req.body)
  if (!isValid) {
    res.status(200).json({
      error_code: -100,
      message: 'invalid parrams'
    })
    return
  }
  const rows = await getReceiverById(req.body.uid);
  const sender = rows[0]

  const entity = {
    acc_name: sender.name,
    from_account: sender.account_num,
    to_account: req.body.to_account,
    note: req.body.note,
    amount: req.body.amount,
    partner_code: req.body.partner_code,
    timestamp: moment().valueOf(new Date()),
    state: 1, // chưa thành công
    type: type// type trừ tiền
  };

  // console.log('-------------', sender.surplus)
  if (sender.surplus < req.body.amount) {
    res.status(200).json({
      msg: 'failure',
      errorCode: -201,
    })
  } else {
    const insertVal = await transferModel.add(entity)
    const otp = OTP.generate(SECRET_TOKEN);
    console.log('OTP tranfer', otp);
    let msg = msgTemplate(sender.name, 'transfer', otp)
    let html_msg = htmlMsgTemplate(sender.name, 'transfer', otp)
    mailController.sentMail(sender.email, '[New Vimo] Please verify OTP for transaction', msg, html_msg)

    res.status(200).json({
      msg: 'successfully',
      errorCode: 0,
      transId: insertVal.insertId
    })

    if (type === 4){
      const creditor = await getIdByAccountNum(req.body.to_account);
      const creditorInfo = creditor[0];
      let notify = {
        type: 4,
        recipient: creditorInfo.id,
        account_id: sender.account_num,
        name: sender.name,
        money: req.body.amount,
        message: req.body.note,
        debt_id: req.body.debt
      }
      const delNotify = await notifyModel.deleteByDebtId(req.body.debt);
      let delDebt = await debtModel.delete(req.body.debt)
      let update = await notifyModel.add(notify);

      broadcastAll(JSON.stringify(notify));
    }
  }
})

router.post('/:id', async (req, res) => {
  console.log('req.body', req.body);

  let otp = req.body.OTP;
  const isValid = OTP.verify({ token: otp, secret: SECRET_TOKEN });
  if (!isValid)
    res.status(200).json({
      msg: 'failure, invalid OTP',
      errorCode: -202, // mã lỗi OTP không hợp lệ
    })
  else {
    let transaction = await transferModel.get(req.body.transId);
    if (!transaction || transaction.length == 0) {
      res.status(200).json({
        msg: 'failure, invalid transId',
        errorCode: -207, // mã lỗi OTP không hợp lệ
      })
      return
    }
    transaction = transaction[0]

    let ts = moment().valueOf(new Date()); // get current milliseconds since the Unix Epoch
    let data = {
      from: transaction.acc_name,
      from_account: transaction.from_account,
      to_account: transaction.to_account,
      amount: transaction.amount, // đơn vị VND
      note: transaction.note,
      ts: ts
    }
    // console.log('=======================transaction',transaction)
    // chuyển khoản nội bộ
    if(transaction.partner_code === null || transaction.partner_code === '0' || transaction.partner_code === 0) {
      // console.log('===========================', transaction)
      const err = await minusTransfer(req.body.transId, transaction.amount, transaction.from_account)
      const entityPlus = {
        acc_name: transaction.acc_name,
        from_account: transaction.to_account,
        to_account: transaction.from_account,
        note: 'nhận tiền',
        amount: transaction.amount,
        partner_code: 0,
        state: 0,
        type: 0, // type = 0 nhận tiền
        timestamp: moment().valueOf(new Date())
      };
      let result = await plus(entityPlus, transaction.to_account)
      if (err == 0) {
        res.status(200).json({
          msg: 'successfully',
          errorCode: 0,
          transId: result.transId, // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
          to_account: result.to_account, // số tài khoản thụ hưởng
          amount: result.amount // số tiền giao dịch
        })
      } else {
        res.status(200).json({
          msg: 'failure, invalid OTP',
          errorCode: -202, // mã lỗi sOTP không hợp lệ
        })
      }
    } else {
      // chuyển khoản pgp
      if(transaction.partner_code === '7261' || transaction.partner_code === 7261) { 
        let respose = await tranferPgp(transaction)
        // console.log(respose.data)
       
        let signature = respose.data.sign
        
        if (!signature) signature = `don't respone signature`
        const tran = {
          type: 2,
          state: 0,
          signature: signature
        }
        let isVerify = await pgp.verifyUtf8(signature)
        if (isVerify) {
          await minusTransfer(req.body.transId, transaction.amount, transaction.from_account)
          patch(tran, {trans_id: req.body.transId}, 'transaction_tranfer')
          res.status(200).json({
            msg: 'successfully',
            errorCode: 0,
            transId: req.body.transId, // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
            to_account: transaction.to_account, // số tài khoản thụ hưởng
            amount: transaction.amount // số tiền giao dịch
          }) 
        } else {
          res.status(200).json({
            msg: 'invalid',
            errorCode: 101,
          }) 
        }
      } else {
        let respose = await tranferRSA(transaction)
        // console.log(respose)
        await minusTransfer(req.body.transId, transaction.amount, transaction.from_account)
        let signature = respose.data.sign
        if (!signature) signature = `don't respone signature`
        const tran = {
          type: 2,
          state: 0,
          signature: signature
        }
        patch(tran, {trans_id: req.body.transId}, 'transaction_tranfer')
        res.status(200).json({
          msg: 'successfully',
          errorCode: 0,
          transId: req.body.transId, // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
          to_account: transaction.to_account, // số tài khoản thụ hưởng
          amount: transaction.amount // số tiền giao dịch
        }) 
        
      }
      res.status(200).json({
        msg: 'tranfer another backing not suport yet!!',
        errorCode: -203, // mã lỗi sOTP không hợp lệ
      })
    }
  }
});

module.exports = router;