const express = require('express')
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')
const { TIME_OUT_TOKEN, SECRET_KEY_TOKEN, LENGTH_REFREST_TOKEN, SECRET_TOKEN, OTP} = require('../config')
const refeshTokenModel = require('../models/refeshToken.model')

const router = express.Router()

router.post('/', async (req, res) => {

  const payload = {
    userId: req.body.id
  }

  const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
    expiresIn: TIME_OUT_TOKEN
  })
  res.json({
    accessToken: token
  })
})

module.exports = router;