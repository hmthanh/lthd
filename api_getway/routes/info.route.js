const express = require('express')
const moment = require('moment')
const { hash, verifyHash, verify } = require('../utils/rsa.signature')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
// nghia 5412 partner
const router = express.Router()

router.post('/', async (req, res) => {
  console.log(req.body)
  
  
  let timestemp = moment().valueOf(new Date())
  const hashRev = req.body.hash
  console.log('hashRev ', hashRev)
  const partnerCode = req.body.partnerCode
  const data = req.body.data
  let msg = 'successfully'
  const signature = Buffer.from(req.body.signature)
  const rsaVerify =  verify('nhom', signature)
  console.log('rsaVerify ', rsaVerify)
  let errorCode = 0
  let info = {}
  if (!data) {
    msg = 'invalid params'
    errorCode = 1003
  } else {
    const userName = data.userName
    const accountNum = data.accountNum
    console.log(JSON.stringify(data))
    // const hashVal = bcrypt.verifyHash(JSON.stringify(data), 5412)
    //JSON.stringify(data)
    const verifyHash = bcrypt.compareSync(JSON.stringify(data), hashRev)
    // hash(JSON.stringify(data))
    console.log(verifyHash)

    if (partnerCode !== '5412') {
      msg = 'invalid partner code'
      errorCode = 1000
    } else if (timestemp - data.ts > (30000 * 30)) {
      msg = 'request timeout'
      errorCode = 1001
    } else if (!verifyHash) {
      msg = 'invalid hash'
      errorCode = 1002
    } else if (!userName && !accountNum) {
      msg = 'invalid params'
      errorCode = 1003
    } else {
      // if(userName) userName = 'default'
      let rows = await userModel.singleByUser(userName, accountNum)
      // console.log(rows)
      if (rows && rows[0])
        info = {
          name: rows[0].name,
          accountNum: rows[0].account_num,
          userName: rows[0].user_name,
          birthDay: moment(rows[0].date_of_birth).format('MM/DD/YYYY')
        }
    }
  }
  let ret = { msg, errorCode, data: info, rsaVerify }
  res.status(200).json(ret)
})

module.exports = router