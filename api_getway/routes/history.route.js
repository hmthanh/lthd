const express = require('express');
const moment = require('moment');
const {getAccount} = require('../models/account.model');
const {get, getReceive, getTrans, getAllHist, countRow} = require('../models/history.model');
const router = express.Router();

router.post('/:from', async (req, res) => {
  console.log("body", req.body, "params", req.params);
  let from = req.params.from || 0
  let count = req.params.count || 30
  let fromTime = req.body.from;
  let to = req.body.to;
  let type = req.body.type;
  let partner = req.body.partner || 0;

  const historyData = await getAllHist(from, count, fromTime, to, partner, type)
  // console.log(total)
  let total = await countRow(from, count, fromTime, to, partner, type)
  console.log(total)
  await res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    total: 0 || total[0].total_row,
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