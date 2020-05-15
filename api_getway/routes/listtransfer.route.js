
const express = require('express')
const { get, getByAssociate, getByInternal, searchByAcc } = require('../models/listtransfer.model')
const router = express.Router()


// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/all', async (req, res) => {
  let from = req.params.from
  let count =   req.params.count
  if (!from) from = 0
  if (!count) count = 30
  let response = await get(from, count)
  res.status(200).json({response})
})

router.post('/associate', async (req, res) => {
  let from = req.params.from
  let count =   req.params.count
  if (!from) from = 0
  if (!count) count = 30
  let response = await getByAssociate(from, count)
  res.status(200).json({response})
})

router.post('/internal', async (req, res) => {
  let from = req.params.from
  let count =   req.params.count
  if (!from) from = 0
  if (!count) count = 30
  let response = await getByInternal(from, count)
  res.status(200).json({response})
})

router.post('/account', async (req, res) => {
  let from = req.params.from
  let count =   req.params.count
  if (!from) from = 0
  if (!count) count = 30
  let response = await searchByAcc(req.params.accNum, from, count)
  res.status(200).json({response})
})


module.exports = router