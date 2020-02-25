const express = require('express')
const receiverModel = require('../models/receiverInfo.model')
const router = express.Router()

router.post('/', async (req, res) => {  
  console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    ower_id: req.body.ownerId,
    alias_name: req.body.aliasName,
    partner_bank: req.body.banking
  }
  console.log('entity',entity)
  let ret, errorCode, item = null
  // if(!entity.account_num || !entity.ower_id || !entity.alias_name || !entity.partner_bank) {
  //   msg = 'invalid parameters, require userName or accountNum'
  //   errorCode = 201
  // }
  // else {
    console.log('await')
    let rows = await receiverModel.add(entity)
    if (rows) item = entity
    console.log('await', rows)
    errorCode = 200 
    msg = 'successfully'
  // }
  ret = {
      item,
      msg
  }
  res.status(errorCode).json(ret)
})

router.post('/:id', async (req, res) => {  
  // console.log(req.params.id)
  res.status(200).json("")
})

module.exports = router