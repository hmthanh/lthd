const express = require('express');
const moment = require('moment');
const {getAccount} = require('../models/account.model');
const {get, getReceive, getTrans, getallHist, countRow} = require('../models/history.model');
const router = express.Router();

router.post('/:from', async (req, res) => {
  console.log(req.body,req.params )
  let from = req.params.from || 0
  let count =   req.params.count || 30
  let fromTime = req.body.from;
  let to = req.body.to;
  let partner = req.body.partner || 0;

  const historyData = await getallHist(from, count, fromTime, to, partner)
  let total = await countRow(from, count, fromTime, to, partner)
  // console.log(historyData)
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    total: total[0].numrow,
    item: historyData
  })
});

router.post('/trans', async (req, res) => {
  const uid = req.body.uid;
  const info = await getAccount(uid);
  const accountNum = info[0].account_num;
  const historyData = await getTrans(accountNum);
  await res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: historyData
  })
});

router.post('/receive', async (req, res) => {
  const uid = req.body.uid;
  const info = await getAccount(uid);
  const accountNum = info[0].account_num;
  const historyData = await getReceive(accountNum);
  await res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: historyData
  })
});


module.exports = router;