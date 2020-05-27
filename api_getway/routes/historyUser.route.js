const express = require('express')
const moment = require('moment')
const {getAllHistByUid} = require('../models/history.model')
const {getAllAccount} = require('../models/account.model');
const router = express.Router()


router.post('/', async (req, res) => {
  console.log(req.body)
  let from = req.params.from || 0
  let count = req.params.count || 30
  let to = moment(new Date()).valueOf()
  let fromTime = to - (30 * 24 * 60 * 60 * 1000)
  let type = req.body.type
  let partner = req.body.partner
  const uid = req.body.uid
  const rows = await getAllAccount(uid)

  if (!rows || rows.length == 0) {
    res.status(200).json({
      msg: 'uid not exists',
      errorCode: -202,
    })
  } else {
    let accountNum = rows.map(item => item.account_num)
    accountNum = `(${accountNum.join()})`
    // console.log(from, count, fromTime, to, accountNum, type, partner)
    const historyData = await getAllHistByUid(from, count, fromTime, to, accountNum, type, partner)
    // console.log(historyData)
    res.status(200).json({
      msg: 'successfully',
      errorCode: 0,
      item: historyData
    })
  }
})

module.exports = router