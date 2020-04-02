const express = require('express')
const moment = require('moment')
const { getall, getByAccountNum } = require('../models/history.model')
const router = express.Router()



router.post('/hist', async (req, res) => {
    const type = req.body.type;
    const historyData = await getall(type)
    historyData.map((val, index) => {
      val.timestamp = moment(val.timestamp).format('HH:mm:ss, DD-MM-YYYY')
    })
    res.status(200).json({
      msg: 'successfully',
      errorCode: 0,
      item: historyData
    });

})

router.post('/hist/:account', async (req, res) => {
  const type = req.body.type;
  const historyData = await getByAccountNum(req.params.account, type)
  historyData.map((val, index) => {
    val.timestamp = moment(val.timestamp).format('HH:mm:ss, DD-MM-YYYY')
  })
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: historyData
  });

})


module.exports = router;