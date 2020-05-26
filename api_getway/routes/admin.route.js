const express = require('express')
const moment = require('moment')
const userAccount = require('../models/userAccount.model')
const {
  SECRET_TOKEN, OTP, PGP_URL_INFO, PGP_PARTNERCODE, RSA_PARTNERCODE,
  RSA_URL_INFO, SECRET_RSA, LENGTH_REFREST_TOKEN
} = require('../config')
const common = require('../utils/common')
const mailController = require('../mailer/mail.controller')
const refreshTokenModal = require('../models/refeshToken.model');
const rndToken = require('rand-token')

const router = express.Router()
const validateData = (data) => {
  if (!common.isNumber(data.phone)) return false
  if (!common.validEmail(data.email)) return false
  if (!data.name) return false
  try {
    new Date(data.date_of_birth)
  } catch (error) {
    return false
  }
  return true
}

router.post('/employee', async (req, res) => {
  console.log(req.body)
  const isValid = validateData(req.body)
  if (!isValid) {
    await res.json({
      msg: 'invalid params',
      errorCode: -100
    })
    return
  }
  const nonUsername = common.nonAccentVietnamese(common.strimString(req.body.name))
  let count = await userAccount.countUserName(nonUsername)
  let entity = {
    name: req.body.name,
    email: req.body.email,
    phone: parseInt('84' + parseInt(req.body.phone)),
    date_of_birth: moment(req.body.date_of_birth, 'MM-DD-YYYY'),
    user_name: `${nonUsername}${count}`,
    role: req.body.role || 3,
    status: req.body.role || 2
  }
  let results = await userAccount.add(entity)
  let restItem = {
    id: results.insertId,
    name: req.body.name,
    username: `${nonUsername}${count}`,
    email: req.body.email,
    dateOfBirth: req.body.date_of_birth,
    phone: parseInt(`84${parseInt(req.body.phone)}`)
  }
  let msgText = common.msgLogingTemplate({...restItem, password: pass});
  // console.log(sender.email, sender);
  let html_msg = common.htmlMsgLogingTemplate({...restItem, password: pass});
  mailController.sentMail(req.body.email, '[New Vimo][important !!!] Account Vimo', msgText, html_msg);
  const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
  refreshTokenModal.add({user_id: results.insertId, refresh_token: rfToken});
  await res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: restItem
  })
})

module.exports = router