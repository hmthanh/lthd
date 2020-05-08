const express = require('express')
const moment = require('moment')
const {hash, verifyHash, verify, sign} = require('../utils/rsa.signature')
const { plus } = require('../utils/db')
const bcrypt = require('bcryptjs')

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
  console.log(req.body)
  console.log(req.body.data)
  const timestemp = moment().valueOf(new Date()) 
  const hashRev = req.body.hash
  const partnerCode = req.body.partnerCode
  const signature = Buffer.from(req.body.signature, 'base64')
  console.log('signature', signature)
  const data = req.body.data
  // const hashVal = hash(JSON.stringify(data))
  const hashVal = JSON.stringify(data)

  console.log('JSON.stringify(data)', JSON.stringify(data))
  const isValid = true
  try {
    isValid = verify(JSON.stringify(data), signature)
  } catch {

  }
  console.log('isValid',  hashVal,  hashRev)
  let msg = 'successfully'
  let errorCode = 0
  let info = {}
  if(partnerCode !== '5412') {
    msg = 'invalid partner code'
    errorCode = 1000
  } else if( timestemp - data.ts > (30000 * 20)) {
    msg = 'request timeout'
    errorCode = 1001
  } else 
  // if (!verifyHash(hashRev, hashVal)) {
  //   msg = 'invalid hash'
  //   errorCode = 1002
  // } 
  if (!bcrypt.compareSync(hashVal, hashRev)){
    msg = 'invalid hash'
    errorCode = 1002
  }
  else if(!isValid) {
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
      signature: signature.toString('base64'),
      type: 0,
      partner_code: partnerCode,
      state: 1
    }
    let result = await plus(enyity)
    if(result) {
      info = {
        tranId: result.tranId,
        accountNum: result.accountNum,
        amount:  result.amount, // đơn vị VND
        ts: timestemp
      }
    }
  }
  const dataString = JSON.stringify(info)
  console.log(dataString)
  let ret = {msg, errorCode, data: info, hash: hash(JSON.stringify(dataString)), signature: sign(dataString).toString('base64')}
  console.log(ret)
  res.status(200).json(ret)
})
module.exports = router