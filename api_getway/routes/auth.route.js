const express = require('express')
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')
const authModel = require('../models/auth.model')
const {TIME_OUT_TOKEN, SECRET_KEY_TOKEN, LENGTH_REFREST_TOKEN, SECRET_TOKEN, OTP} = require('../config')
const mailController = require('../mailer/mail.controller')
const {htmlMsgTemplate, msgTemplate} = require('../utils/common')
const { updatePwd } = require('../models/account.model')
const userModel = require('../models/user.model')
const userAccountModel = require('../models/userAccount.model')
const refeshTokenModel = require('../models/refeshToken.model')
const bcrypt = require('bcryptjs')
const common = require('../utils/common')


const router = express.Router()

router.post('/', async (req, res) => {
  // console.log(req.body);
  const rows = await userModel.singleByUserName(req.body.username);
  if (rows.length !== 0) {
    const user = rows[0];
    const hashPwd = user.password;
    if (!bcrypt.compareSync(req.body.password, hashPwd)) {
      await res.json({
        err_code: -201,
        msg: 'password incorrectly',
        authenticated: false,
      })
    } else {
      console.log("user.status", user.status);
      if (user.status === 0) {
        await res.json({
          id: user.id,
          err_code: -202,
          msg: 'account not acctive',
          authenticated: false,
        })
      } else {
        delete user.password;
        const refreshToken = rndToken.generate(LENGTH_REFREST_TOKEN);
        refeshTokenModel.add({user_id: user.id, refresh_token: refreshToken});
        const accessToken = jwt.sign({userId: user.id, role: user.role}, SECRET_KEY_TOKEN, {
          expiresIn: TIME_OUT_TOKEN
        });
        res.json({
          authenticated: true,
          user,
          accessToken,
          refreshToken
        })
      }
    }
  } else {
    console.log("Else")
    res.json({
      err_code: -200,
      msg: 'account not exits',
      authenticated: false,
    })
  }
});

router.post('/activate', async (req, res) => {
  // console.log('===================================')
  // console.log(req.body)
  await userAccountModel.updatePwd(req.body.newPwd, req.body.uid)
  res.status(200).json({
    errorCode: 0,
    msg: 'successfully'
  })
});

router.post('/relogin', async (req, res) => {
  const ret = await authModel.relogin(req.body);
  delete ret.password;
  const payload = {
    userId: ret.id,
    role: ret.role
  };
  const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
    expiresIn: TIME_OUT_TOKEN
  });
  const rfToken = await refeshTokenModel.get(ret.id);
  await res.json({
    authenticated: true,
    user: ret,
    accessToken: token,
    refreshToken: rfToken
  })
});

router.post('/forget', async (req, res) => {
  console.log('forget', req.body)
  const rows = await userModel.singleByUserName(req.body.username)
  if (rows.length === 0) {
    res.status(200).json({
      err_code: -200,
      msg: `not found email ${req.body.username}`
    })
  } else {
    const item = rows[0]
    const pass = OTP.generate(SECRET_TOKEN)
    console.log(` default password: ${pass}`)
    let msg = common.msgForgetTemplate(item.name, pass)
    // console.log(sender.email, sender);
    const htmlmsg = common.htmlForgetTemplate(item.name, pass)
    mailController.sentMail(item.email, '[New Vimo][important !!!] Account Vimo', msg, htmlmsg)
    res.status(200).json({
      err_code: 0,
      uid: item.id,
      msg: `new password sent to ${item.email}`
    })
  }
});


router.patch('/forget', async (req, res) => {
  console.log('forget', req.body)
  let otp = req.body.OTP;
  const isValid = OTP.verify({token: otp, secret: SECRET_TOKEN});
  if (!isValid) {
    res.status(200).json({
      error: -401,
      msg: 'invalid OTP'
    })
  } else {
    const rows = await userModel.singleByUserId(req.body.uid)
    if (rows.length === 0) {
      res.status(200).json({
        err_code: -200,
        msg: `not found email ${req.body.username}`
      })
    } else {
      // const item = rows[0]
      let ret = await userAccountModel.updatePwd(req.body.newPwd, req.body.uid)
      const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
      refeshTokenModel.add({user_id: req.body.uid, refresh_token: rfToken});
      res.status(200).json({
        error: 0,
        authenticated: true,
        user: ret,
        refreshToken: rfToken
      })
    }
  }
});

// router.post('/forget-otp', async (req, res) => {
//   let otp = req.body.otp;
//   const isValid = OTP.verify({token: otp, secret: SECRET_TOKEN});
//   if (isValid) {
//     await userAccountModel.updatePwd(req.body.newPwd, req.body.uid)
//     const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
//     refeshTokenModel.add({user_id: req.body.uid, refresh_token: rfToken})
//     res.status(200).json({
//       errorCode: 0,
//       msg: 'successfully'
//     })
//   } else {
//     res.status(200).json({
//       errorCode: 401,
//       msg: 'invalid OTP'
//     })
//   }
// })

router.post('/verify', async (req, res) => {
  console.log("req.body", req.body)
  const user = await authModel.comparePwd(req.body);
  let authenticated = false;
  if (user !== null) {
    authenticated = true;
    const otp = OTP.generate(SECRET_TOKEN);
    console.log('OTP change password:  ', otp);
    let msg = msgTemplate(user.name, 'change password', otp);
    let htmlmsg = htmlMsgTemplate(user.name, 'change password', otp);

    mailController.sentMail(user.email, '[New Vimo] Please verify OTP for change password', msg, htmlmsg)
  }
  res.status(200).json({
    authenticated
  })
});

router.patch('/', async (req, res) => {
  // console.log('req.body', req.body);
  let otp = req.body.OTP;
  const isValid = OTP.verify({token: otp, secret: SECRET_TOKEN});
  // console.log('check ', isValid);
  if (isValid) {
    let entity = {
      newPwd: req.body.newPwd,
      uId: req.body.uId
    };
    let ret = await userAccountModel.updatePwd(req.body.newPwd, req.body.uId)
    // await authModel.updatePwd(entity);
    // delete ret.password;
    const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
    refeshTokenModel.add({user_id: req.body.uId, refresh_token: rfToken});
    res.status(200).json({
      error: 0,
      authenticated: true,
      user: ret,
      refreshToken: rfToken
    })
  } else {
    res.status(200).json({
      error: 401,
      msg: 'invalid OTP'
    })
  }
});

module.exports = router;