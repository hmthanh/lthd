const express = require('express');
const remindModel = require('../models/remind.model');
const router = express.Router();
const userModel = require('../models/user.model');
const {broadcastAll} = require('../ws');

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('', async (req, res) => {
  const rows = await userModel.singleByUserId(req.body.id);
  const userInfo = rows[0];
  let response = await remindModel.get(userInfo.account_num);
  console.log(response);
  res.status(200).json({response});
  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
});

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/:id', async (req, res) => {
  let rows = await remindModel.count(req.body.id);
  res.status(200).json({error: 0, item: rows[0]})

  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
});

module.exports = router;