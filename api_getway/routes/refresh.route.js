const express = require('express')
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')
const { TIME_OUT_TOKEN, SECRET_KEY_TOKEN, LENGTH_REFREST_TOKEN, SECRET_TOKEN, OTP} = require('../config')
const refeshTokenModel = require('../models/refeshToken.model')

const router = express.Router()

router.post('/', async (req, res) => {
  const refreshToken = req.body.refreshToken
  const uid = req.body.id
  const rows = refeshTokenModel.get(uid, refreshToken)
  if(rows.length === 0) {
    res.json({
      errorCode: -203,
      msg: 'Refesh Token not found'
    })
  } else {
    const payload = {
      userId: uid
    }
  
    const accessToken = jwt.sign(payload, SECRET_KEY_TOKEN, {
      expiresIn: TIME_OUT_TOKEN
    })
    res.json({
      errorCode: 200,
      msg: 'successfully',
      accessToken,
    })
  }
})

module.exports = router;