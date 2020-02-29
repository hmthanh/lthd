const express = require('express')
const moment = require('moment')
const {hash, verifyHash, verify} = require('../utils/rsa.signature')
const {} = require('../utils/rsa.signature')
const userModel = require('../models/user.model')

const router = express.Router()

router.post('/', async (req, res) => {
  // console.log(req.body)
  let timestemp = moment().valueOf(new Date()) 
  const partnerCode = req.body.partnerCode
  const signature =req.body.signature
  const data = req.body.data
  console.log(signature.data)
  const hashVal = hash(JSON.stringify(data))
  const isValid = verify(JSON.stringify(data), Buffer.from(signature.data))

  let msg = 'successfully'
  let errorCode = 0
  let info = {}
  if(partnerCode !== '0725') {
    msg = 'invalid partner code'
    errorCode = 1000
  } else if( timestemp - data.ts > 30000) {
    msg = 'request timeout'
    errorCode = 1001
  } else if (!verifyHash(hashRev, hashVal)) {
    msg = 'invalid hash'
    errorCode = 1002
  } else if(!isValid) {
    msg = 'invalid signature'
    errorCode = 1003
  }
  //else {
  //   let rows = await userModel.singleByUser(userName, accountNum)
  //   // console.log(rows)
  //   if(rows)
  //     info = {
  //       name: rows[0].name,
  //       accountNum: rows[0].account_num,
  //       userName: rows[0].user_name
  //     }
  // }
  let ret = {msg, errorCode, ...info}
  res.status(200).json(ret)
})
module.exports = router