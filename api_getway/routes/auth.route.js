const express = require('express');
const jwt = require('jsonwebtoken');
const rndToken = require('rand-token');
const authModel = require('../models/auth.model');
const { TIME_OUT_TOKEN, SECRET_KEY_TOKEN, LENGTH_REFREST_TOKEN } = require('../config')

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
  
module.exports = router;