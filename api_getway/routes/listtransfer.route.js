
const express = require('express')
const { get } = require('../models/listtransfer.model')
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


module.exports = router