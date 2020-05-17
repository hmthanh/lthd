const express = require('express')
const listuserModel = require('../models/listuser.model')
const router = express.Router()


// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/all', async (req, res) => {  
  let response = await listuserModel.get()
  res.status(200).json({response})

  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
})

// post để tạo 1 record mới
router.post('/', async (req, res) => {  
  // console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    date_time: new Date(req.body.datetime),
    debt_val: req.body.debtval,
    note: req.body.note
  }
  // console.log('entity',entity)
  let ret, errorCode, item = null
  let rows = await debtModel.add(entity)
  if (rows) item = entity
  console.log('await', rows)
  errorCode = 200 
  msg = 'successfully'

  ret = {
      item,
      msg
  }
  res.status(errorCode).json(ret)

  broadcastAll(JSON.stringify(item))
})

// update 1 record

router.patch('/', async (req, res) => {  

  let entity = {
    name: req.body.name,
    phone:  req.body.phone
  }
  const item = await listuserModel.update(req.body.id, entity)

  let ret, errorCode = 200
  msg = 'successfully'
  ret = {
      item: '',
      msg
  }
  res.status(errorCode).json(ret)
})
// xóa 1 record
router.delete('/', async (req, res) => {  
  console.log('router.delete', req.body)
  let ret, errorCode = 200, item = null
  item = listuserModel.delete(req.body.id)
  msg = 'successfully'
  ret = {
      item,
      msg
  }
  res.status(errorCode).json(ret)
})


module.exports = router