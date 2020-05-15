

const express = require('express')
const moment = require('moment')
const { hash, verifyHash, verify, sign } = require('../utils/rsa.signature')
const pgp = require('../utils/pgp.signature')
const { SECRET_TOKEN, OTP, PGP_URL_TRANFER } = require('../config')
const mailController = require('../mailer/mail.controller')
const transferModel = require('../models/transfer.model')
const { getReceiverById, getIdByAccountNum } = require('../models/account.model')
const { htmlMsgTemplate, msgTemplate } = require('../utils/common')
const { minusTransfer, plus, patch } = require('../utils/db')
const bankingAccountModel = require('../models/bankingAccount.modal')
const {broadcastAll} = require('../ws');
const router = express.Router()
const partnerCode = 5412
const encoding = 'base64'

const axios = require("axios")

const validateData = (data) => {
  if (!data.to_account) return false;
  if (!data.amount) return false;
  return true
}

const tranferPgp = async data => {
  const UrlApi = PGP_URL_TRANFER
  let signature  =  await pgp.signUtf8('nhom6') //JSON.stringify(data)
  data.Signature = Buffer.from(signature).toString(encoding)
  data.Hash = bcrypt.hashSync(`${data.STTTH}${data.STTTHAnother}${data.PartnerCode}${data.Time}${data.Money}Nhom6`)
  // console.log(data)
  return axios.post(UrlApi, data)
}

router.post('/', async (req, res) => {
  const type = req.body.type ? req.body.type : 1
  // console.log(req.body)
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
    let htmlmsg = htmlMsgTemplate(sender.name, 'transfer', otp)
    mailController.sentMail(sender.email, '[New Vimo] Please verify OTP for transaction', msg, htmlmsg)

    res.status(200).json({
      msg: 'successfully',
      errorCode: 0,
      transId: insertVal.insertId
    })

    if (type === 4){
      const creditor = await getIdByAccountNum(req.body.to_account);
      // console.log("creditor", creditor);
      const creditorInfo = creditor[0];
      // console.log(creditorInfo);
      let alertData = {
        alertType: 4,
        recipient: creditorInfo.id,
        ownerAccNum: sender.account_num,
        ownerName: sender.name,
        message: req.body.note,
      }

      // console.log(alertData);
      broadcastAll(JSON.stringify(alertData));
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
      if(transaction.partner_code === 7261) { 
        let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
        let dataPgp = {
            STTTH:`${transaction.to_account}`,
            PartnerCode:`${partnerCode}`,
            Time: `${parseInt(ts / 1000)}`,
            STTTHAnother: `${transaction.from_account}`,
            Money: `${transaction.amount}`,
            PartnerCode: `${partnerCode}`
        }
        tranferPgp(dataPgp)
        .then ( async respose => {
          // trừ tiền - lưu chữ kí
          await minusTransfer(req.body.transId, transaction.amount, transaction.from_account)
          let signature = respose.signature
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
        })
        .catch( error => {
          console.log(error)
          res.status(200).json({
            msg: 'another backing error!!',
            errorCode: -205, // mã lỗi sOTP không hợp lệ
          })
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