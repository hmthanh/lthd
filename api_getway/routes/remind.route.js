const express = require('express')
const remindModel = require('../models/remind.model')
const router = express.Router()
const { broadcastAll } = require('../ws')

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/:account_num', async (req, res) => {  
  let rows = await remindModel.get(req.params.account_num)
  res.status(200).json({error: 0, item: rows})

  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
})



module.exports = router