const express = require('express')
const moment = require('moment')
const {hash, verifyHash, verify, sign, setPubkeyRSA} = require('../utils/rsa.signature')
const { plus } = require('../utils/db')
const {RSA_PARTNER_SCRE, SECRET_RSA, RSA_PARTNERCODE} = require('../config')
const bcrypt = require('bcryptjs')
const { TranferToAccount } = require('../models/transaction.Tranfer.Model')
const { getAccountInfo } = require('../models/account.model')


const encoding = 'base64'

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
  // console.log(req.body.data)
  const timestemp = moment().valueOf(new Date()) 
  const hashRev = req.body.hash

  const partnerCode = req.body.partnerCode
  let isValid = false
  let hashValid = false
  let hashVal = null
  let signature = null
  let data = req.body.data
  let signData = null
  if (partnerCode === '6572') {
    let signRSA = Buffer.from(req.body.sign, 'base64')
    signature = Buffer.from(signRSA, 'utf8')
    hashVal = hash(JSON.stringify(data), RSA_PARTNER_SCRE)
    // console.log(hashVal)
    hashValid = verifyHash(hashVal, hashRev)
    signData = JSON.stringify(data)
  }
  if (partnerCode === '5412') {
    setPubkeyRSA('./thirt_app/publicKeyNghia.pem')
    signature = Buffer.from(req.body.signature, 'base64')
    // hashVal = bcrypt.hashSync(data)
    hashValid = bcrypt.compareSync(JSON.stringify(data), hashRev)
    signData = Buffer.from(JSON.stringify(data))
  }
  isValid = verify(signData, signature)
  let msg = 'successfully'
  let errorCode = 0
  let info = {}
  if(partnerCode !== '5412' && partnerCode !== '6572') {
    msg = 'invalid partner code'
    errorCode = 1000
  } else if( timestemp - data.ts > (30000 * 5)) {
    msg = 'request timeout'
    errorCode = 1001
  }
  else if (!isValid) {
    msg = 'invalid signature'
    errorCode = 1002
  } else if (!hashValid){
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
    // tài khoản không tồn tại
    const rows = await getAccountInfo(req.body.to_account);
    if (!rows || rows.length === 0)  {
      res.status(200).json({
        errorCode: -151,
        message: 'from_account not found'
      })
      return
    }
  } else {
    const enyity = {
      acc_name: data.from,
      from_account: data.from_account,
      to_account: data.to_account,
      amount: data.amount,
      timestamp: data.ts ,
      signature: signature.toString(encoding),
      type: 1,
      partner_code: partnerCode,
      state: 0
    }
    let result = await TranferToAccount(enyity, data.to_account)
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
  // console.log(JSON.stringify(dataString), SECRET_RSA)
  // console.log('hash(JSON.stringify(dataString), SECRET_RSA', hash(JSON.stringify(dataString), SECRET_RSA))
  let ret = {msg, errorCode, data: info, hash: hash(dataString, SECRET_RSA), signature: sign(dataString).toString(encoding)}
  res.status(200).json(ret)
})
module.exports = router