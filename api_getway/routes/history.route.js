const express = require('express');
const moment = require('moment');
const {getAccount} = require('../models/account.model');
const {get, getReceive, getTrans} = require('../models/history.model');
const router = express.Router();

router.post('/', async (req, res) => {
  const uid = req.body.uid;
  const info = await getAccount(uid);
  const accountNum = info[0].account_num;
  const historyData = await get(accountNum);
  // console.log(historyData);
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
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