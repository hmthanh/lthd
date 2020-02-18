const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {  
  // const userName = req.body.userName
  // const accountNum = req.body.accountNum
  let ret, errorCode, item = null
  // if(!userName && !accountNum) {
  //   msg = 'invalid parameters, require userName or accountNum'
  //   errorCode = 201
  // }
  // else {
  //   const name = accountNum || userName
  //   const acc = nonAccentVietnamese(name)
  //   let rows = await receiverModel.searching(val, acc)
  //   if (rows) item = rows
  //   errorCode = 200 
  //   msg = 'successfully'
  // }
  ret = {
    msg: 'successfully'
  }
  res.status(200).json(ret)
})

module.exports = router