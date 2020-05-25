const express = require('express')
const moment = require('moment')
const userAccount = require('../models/userAccount.model')
const {
  SECRET_TOKEN, OTP, PGP_URL_INFO, PGP_PARTNERCODE, RSA_PARTNERCODE,
  RSA_URL_INFO, SECRET_RSA, LENGTH_REFREST_TOKEN
} = require('../config')
const common = require('../utils/common')
const mailController = require('../mailer/mail.controller')

const router = express.Router()
const validateData = (data)=> {
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
  const isValid = validateReceiverData(data)
  if(!isValid){
    res.json({
      msg: 'invalid params',
      errorCode: -100
    })
    return
  }
  const uname = common.nonAccentVietnamese(common.strimString(data.name))
  let count = await userAccount.countUserName(uname)
  let entity = {
    name: req.body.name,
    email: reqeq.body.email,
    phone: parseInt( '84' + parseInt(req.body.phone)),
    date_of_birth: moment(req.body.date_of_birth, 'MM-DD-YYYY'),
    user_name: `${uname}${count}`,
    role: data.role || 3,
    status: data.role || 2
  }
  let results = await userAccount.add(entity)
  restItem = {
    id: results.insertId,
    name: data.name,
    username: `${uname}${count}`,
    email: data.email,
    dateOfBirth: dob,
    phone: parseInt(`84${parseInt(data.phone)}`)
  }
  let msgText = common.msgLogingTemplate({...restItem, password: pass});
    // console.log(sender.email, sender);
  let htmlmsg = common.htmlMsgLogingTemplate({...restItem, password: pass});
  mailController.sentMail(data.email, '[New Vimo][important !!!] Account Vimo', msgText, htmlmsg);
  const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
  refeshTokenModel.add({user_id: results.insertId, refresh_token: rfToken});
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: restItem
  })
})

module.exports = router