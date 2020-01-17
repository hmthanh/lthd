const express = require('express');
const jwt = require('jsonwebtoken');
const rndToken = require('rand-token');
const authModel = require('../models/auth.model');

const router = express.Router();

router.post('/', async (req, res) => {
    // const ret = await authModel.login(req.body);
    // if (ret === null) {
    //   return res.json({
    //     authenticated: false
    //   });
    // }
  
    const payload = {
      userId: 12872
    }
    const token = jwt.sign(payload, 'shhhhh', {
      expiresIn: 10 * 60 * 1000 // 10 mins
    });
    const rfToken = rndToken.generate(80);
    res.json({
      // authenticated: true,
      accessToken: token,
      refreshToken: rfToken
    })
  })
  
  module.exports = router;