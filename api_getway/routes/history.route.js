const express = require('express');
const moment = require('moment');
const {getAccount} = require('../models/account.model');
const {get} = require('../models/history.model');
const router = express.Router();

router.post('/', async (req, res) => {
  const uid = req.body.uid;
  console.log('==================' + uid);
  const info = await getAccount(uid);
  const accountNum = info[0].account_num;
  console.log(accountNum);
  const historyData = await get(accountNum);
  console.log(historyData);
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: historyData
  })
});

module.exports = router;