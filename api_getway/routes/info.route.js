const express = require('express')
const moment = require('moment')
const {hash, verifyHash} = require('../utils/rsa.signature')
const userModel = require('../models/user.model')

const router = express.Router()

router.post('/', async (req, res) => {  
  // console.log(req.body)
  let timestemp = moment().valueOf(new Date()) 
  const partnerCode = req.body.partnerCode
  const data = req.body.data
  const hashRev = req.body.hash
  const userName = data.userName
  const accountNum = data.accountNum
  const hashVal = hash(JSON.stringify(data))
  // console.log(verifyHash(hashRev, hashVal))
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
  } else if(!userName && !accountNum){
    msg = 'invalid params'
    errorCode = 1003
  } else{
    // if(userName) userName = 'default'
    let rows = await userModel.singleByUser(userName, accountNum)
    // console.log(rows)
    if(rows)
      info = {
        name: rows[0].name,
        accountNum: rows[0].account_num,
        userName: rows[0].user_name
      }
  }
  let ret = {msg, errorCode, ...info}
  res.status(200).json(ret)
})

module.exports = router