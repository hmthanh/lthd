const express = require('express')
const debtModel = require('../models/debt.model')
const router = express.Router()

router.post('/', async (req, res) => {  
  console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    date_time: req.body.date_time,
    debt_val: req.body.debt_val
  }
  console.log('entity',entity)
  let ret, errorCode, item = null
  // if(!entity.account_num || !entity.ower_id || !entity.alias_name || !entity.partner_bank) {
  //   msg = 'invalid parameters, require userName or accountNum'
  //   errorCode = 201
  // }
  // else {
    console.log('await')
    let rows = await debtModel.add(entity)
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
    date_time: req.body.date_time,
    debt_val: req.body.debt_val
  }
  const item = await debtModel.update(req.body.id, entity)

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
  item = debtModel.delete(req.body.id)
  msg = 'successfully'
  ret = {
      item,
      msg
  }
  res.status(errorCode).json(ret)
})

router.post('/:id', async (req, res) => { 
  let rows = await debtModel.get(req.params.id)
  console.log(rows)
  res.status(200).json(rows)
})

module.exports = router