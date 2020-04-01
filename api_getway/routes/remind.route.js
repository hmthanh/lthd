const express = require('express')
const remindModel = require('../models/remind.model')
const debtModel = require('../models/debt.model')
const router = express.Router()
const { broadcastAll } = require('../ws')


// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/', async (req, res) => {
  let rows = await remindModel.get(req.body.id)
  res.status(200).json({error: 0, item: rows})

  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
})

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/:id', async (req, res) => {
  let rows = await remindModel.count(req.body.id)
  res.status(200).json({error: 0, item: rows[0]})

  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
})



module.exports = router