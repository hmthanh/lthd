const express = require('express');
const jwt = require('jsonwebtoken');
const rndToken = require('rand-token');
const authModel = require('../models/auth.model');
const { TIME_OUT_TOKEN, SECRET_KEY_TOKEN, LENGTH_REFREST_TOKEN, SECRET_TOKEN} = require('../config')
const mailController = require('../mailer/mail.controller')
const { htmlMsgTemplate, msgTemplate } = require('../utils/common')
const moment = require('moment')
const bitwise = require('bitwise')

const router = express.Router();

router.post('/', async (req, res) => {
  const ret = await authModel.login(req.body);
  if (ret === null) {
    return res.json({
      authenticated: false
    });
  }

  const payload = {
    userId: ret.id
  }
  const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
    expiresIn: TIME_OUT_TOKEN
  });
  delete ret.password
  const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
  res.json({
    authenticated: true,
    user: ret,
    accessToken: token,
    refreshToken: rfToken
  })
})

router.post('/relogin', async (req, res) => {
  const ret = await authModel.relogin(req.body)
  delete ret.password
  const payload = {
    userId: ret.id
  }
  const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
    expiresIn: TIME_OUT_TOKEN
  })
  const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN)
  res.json({
    authenticated: true,
    user: ret,
    accessToken: token,
    refreshToken: rfToken
  })
})

router.post('/verify', async (req, res) => {
  const user = await authModel.comparePwd(req.body);
  let authenticated = false
  if (user !== null) {
    authenticated = true
    let current = moment().valueOf()
    let otp = SECRET_TOKEN ^ current
    let msg = msgTemplate(user.name, 'change password', otp)
    let htmlmsg = htmlMsgTemplate(user.name, 'change password', otp)

    mailController.sentMail(user.email, '[New Vimo] Please verify OTP for change password', msg, htmlmsg)
  }
  return res.json({
    authenticated
  })
})

router.patch('/', async (req, res) => {
  console.log(req.body)
  let otp = +req.body.OTP
  console.log(otp)
  console.log('current ', ~(otp ^ SECRET_TOKEN))
  // const user = await authModel.comparePwd(req.body);
  // if (user === null) {
  //   return res.json({
  //     authenticated: false
  //   });
  // }
  // const payload = {
  //   userId: user.id
  // }
  // const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
  //   expiresIn: TIME_OUT_TOKEN
  // });
  // let ret = await authModel.updatePwd(req.body);
  // delete ret.password
  // const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
  res.json({
    authenticated: true,
    // user: ret,
    accessToken: '',
    refreshToken: ''
  })
})

module.exports = router;