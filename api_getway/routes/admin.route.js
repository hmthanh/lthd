const express = require('express')
const moment = require('moment')
const userAccount = require('../models/userAccount.model')
const {
 LENGTH_REFREST_TOKEN
} = require('../config')
const {generate} = require('rand-token')
const common = require('../utils/common')
const mailController = require('../mailer/mail.controller')
const refeshTokenModel = require('../models/refeshToken.model')

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
  let data = {...req.body}
  const isValid = validateData(data)
  if(!isValid){
    res.json({
      msg: 'invalid params',
      errorCode: -100
    })
    return
  }
  const uname = common.nonAccentVietnamese(common.strimString(data.name))
  let count = await userAccount.countUserName(uname)
  const pass = generate(8)
  let entity = {
    name: req.body.name,
    email: req.body.email,
    phone: parseInt( '84' + parseInt(req.body.phone)),
    date_of_birth: new Date(moment(req.body.date_of_birth, 'YYYY-MM-DD')),
    user_name: `${uname}${count}`,
    role: data.role || 2,
    status: 0,
    password: pass
  }
  let results = await userAccount.add(entity)
  let restItem = {
    id: results.insertId,
    name: data.name,
    username: `${uname}${count}`,
    email: data.email,
    dateOfBirth: entity.date_of_birth,
    phone: parseInt(`84${parseInt(data.phone)}`)
  }
  let msgText = common.msgLogingAdminTemplate({...restItem, password: pass});
    // console.log(sender.email, sender);
  let htmlmsg = common.htmlMsgLogingAdminTemplate({...restItem, password: pass});
  mailController.sentMail(data.email, '[New Vimo][important !!!] Account Vimo', msgText, htmlmsg);
  const rfToken = generate(LENGTH_REFREST_TOKEN);
  refeshTokenModel.add({user_id: results.insertId, refresh_token: rfToken});
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: restItem
  })
})

module.exports = router