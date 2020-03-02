const express = require('express')
const moment = require('moment')
const {hash, verifyHash, verify, sign} = require('../utils/rsa.signature')
const transfer = require('../models/transfer.model')
const { minus } = require('../utils/db')

const router = express.Router()

const validateData = (data) => {
  if(!data.from) return false
  if(!data.from_account) return false
  if(!data.to_account) return false
  if(!data.amount) return false
  if(!data.ts) return false
  return true
}

router.post('/', async (req, res) => {
  // console.log(req.body)
  const timestemp = moment().valueOf(new Date()) 
  const hashRev = req.body.hash
  const partnerCode = req.body.partnerCode
  const signature = Buffer.from(req.body.signature.data)
  const data = req.body.data
  const hashVal = hash(JSON.stringify(data))
  const isValid = verify(JSON.stringify(data), signature)
  let ret
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
    errorCode = 1004
  } else if(!validateData(data)){
    msg ='invalid data'
    errorCode = 1003
    info = {
      example: {
        from:'nguyễn văn a',
        from_account: 231421321,
        to_account: 73983492348,
        amount: 100000, // đơn vị VND
        note: 'ghi chú',
        ts: data.ts
     }
    }
  } else {
    const enyity = {
      acc_name: data.from,
      from_account: data.from_account,
      to_account: data.to_account,
      amount: data.amount,
      timestamp: data.ts ,
      signature: signature,
      type: 2,
      partner_code: partnerCode,
      statte: 1
    }
    info = enyity
    let retUpdate = -1
    try {
      retUpdate = await minus(enyity)
    } catch (error) {
      console.log(error)
    }
    ret = {msg, errorCode}
    if (retUpdate === -1) {
      msg ='invalid amount'
      errorCode = 1005
      ret = { msg, errorCode }
    } else {
      const dataString = JSON.stringify(info)
      ret = {msg, errorCode,data: info, hash: hash(JSON.stringify(dataString)), signature: sign(dataString)}
    }
  }
  res.status(200).json(ret)
})
module.exports = router