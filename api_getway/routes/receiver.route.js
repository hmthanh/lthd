const express = require('express')
const receiverModel = require('../models/receiverInfo.model')
const router = express.Router()

router.post('/', async (req, res) => {  
  console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
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


router.patch('/', async (req, res) => {  
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    alias_name: req.body.aliasName
  }
  const item = await receiverModel.update(req.body.id, entity)

  let ret, errorCode = 200
  msg = 'successfully'
  ret = {
      item,
      msg
  }
  res.status(errorCode).json(ret)
})

router.delete('/', async (req, res) => {  
  console.log('router.delete', req.body)
  let ret, errorCode = 200, item = null
  item = receiverModel.delete(req.body.id)
  msg = 'successfully'
  ret = {
      item,
      msg
  }
  res.status(errorCode).json(ret)
})

router.post('/:id', async (req, res) => { 
  let rows = await receiverModel.get(req.params.id)
  console.log(rows)
  res.status(200).json(rows)
})

module.exports = router