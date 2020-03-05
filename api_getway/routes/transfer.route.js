const express = require('express')
const moment = require('moment')
const {hash, verifyHash, verify, sign} = require('../utils/rsa.signature')
const {SECRET_TOKEN, OTP} = require('../config')
const mailController = require('../mailer/mail.controller')
const userModel = require('../models/user.model')
const transferModel = require('../models/transfer.model')
const { getInfoAccount } = require('../models/account.model')
const { htmlMsgTemplate, msgTemplate } = require('../utils/common')
const { minusTransfer } = require('../utils/db')
const router = express.Router()

const validateData = (data) => {
  if(!data.from) return false
  if(!data.from_account) return false
  if(!data.to_account) return false
  if(!data.amount) return false
  if(!data.ts) return false
  return true
}

router.post('/', async (req, res) => {
  console.log(req.body)
  const rows = await getInfoAccount(req.body.uid)
  const sender = rows[0]
  const entity = {
    acc_name: sender.name,
    from_account: sender.account_num,
    to_account: req.body.to_account,
    note: req.body.note,
    amount: req.body.amount,
    partner_code: req.body.partner_code,
    timestamp: moment().valueOf(new Date())
  }
  if (sender.surplus < req.body.amount) {
    res.status(200).json({
      msg: 'failure',
      errorCode: -201,
     }
    )
    return
  }
  const insertVal = await transferModel.add(entity)
  const otp = OTP.generate(SECRET_TOKEN)
  console.log('OTP tranfer', otp)
  let msg = msgTemplate(sender.name, 'transfer', otp)
  console.log(sender.email, sender)
  let htmlmsg = htmlMsgTemplate(sender.name, 'transfer', otp)
  mailController.sentMail(sender.email, '[New Vimo] Please verify OTP for transaction', msg, htmlmsg)

  res.status(200).json({
    msg: 'successfully',
    errorCode: 0, // mã lỗi số tiền không đủ thực hiện giao dịch
    transId: insertVal.insertId
   }
  )
})

router.post('/:id', async (req, res) => {
  console.log('req.body', req.body)
  let otp = req.body.OTP
  const isValid = OTP.verify({token: otp, secret: SECRET_TOKEN})
  if (!isValid)
    res.status(200).json({
      msg: 'failure, invalid OTP',
      errorCode: -202, // mã lỗi sOTP không hợp lệ
    })
  else {
    const transaction = await transferModel.get(req.body.transId)
    let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
    let data = {
      from: transaction.acc_name,
      from_account: transaction.from_account,
      to_account: transaction.to_account,
      amount: transaction.amount, // đơn vị VND
      note: transaction.note,
      ts: ts
    }
    let hashVal = hash(JSON.stringify(data))
    let signVal = sign(JSON.stringify(data))
    let requestBody = {
        hash: hashVal,
        signature: signVal,
        data: data,
        partnerCode: '0725'
    }
    // const UrlApi = '/openapi/minus'
    return axios({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      url: UrlApi,
      data: requestBody
    })
    .then ( async respose => {
      if(respose.data.errorCode == 0) {
        let retsult = await transferModel.done(req.body.transId)
        if(retsult) {
          const err = await minusTransfer(req.body.transId, transaction.amount, transaction.from_account)
          if (err == 0) {
            res.status(200).json({
              msg: 'successfully',
              errorCode: 0, 
              transId: req.body.transId, // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
              to_account: transaction.to_account, // số tài khoản thụ hưởng
              amount: transaction.amount // số tiền giao dịch
            })
          } else {
            res.status(200).json({
              msg: 'failure, invalid OTP',
              errorCode: -202, // mã lỗi sOTP không hợp lệ
            })
          }
        }
      }
    })
    .catch( error => console.log(error))
    
  }
})

module.exports = router