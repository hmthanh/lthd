const express = require('express')
const moment = require('moment')
const {hash, verifyHash, verify, sign} = require('../utils/rsa.signature')
const { plus } = require('../utils/db')
const {SECRET_TOKEN, OTP} = require('../config')
const mailController = require('../mailer/mail.controller')
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
  const transferType = req.body.transferType
  const partner_code = req.body.partner_code
  console.log(req.body.data)
  const otp = OTP.generate(SECRET_TOKEN)
  console.log('token ', otp)
  let msg = msgTemplate(user.name, 'transfer', otp)
  let htmlmsg = htmlMsgTemplate(user.name, 'transfer', otp)
  mailController.sentMail(user.email, '[New Vimo] Please verify OTP for transaction', msg, htmlmsg)

  res.status(200).json({
    msg: 'successfully',
    errorCode: 0, // mã lỗi số tiền không đủ thực hiện giao dịch
    transId: 2717 }
  )
})

router.post('/:id', async (req, res) => {
  console.log('req.body', req.body)
  let otp = req.body.OTP
  const isValid = OTP.verify({token: otp, secret: SECRET_TOKEN})
  if (isValid)
    res.status(200).json({
      msg: 'failure, invalid OTP',
      errorCode: -202, // mã lỗi sOTP không hợp lệ
    })
  else
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0, // mã lỗi số tiền không đủ thực hiện giao dịch
    transId: 2717, // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
    to_account: '213214214', // số tài khoản thụ hưởng
    amount: 831882193 // số tiền giao dịch
  })
})

module.exports = router