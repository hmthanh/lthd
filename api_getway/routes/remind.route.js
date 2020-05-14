
const express = require('express');
const remindModel = require('../models/remind.model');
const router = express.Router();
const userModel = require('../models/user.model');
const {broadcastAll} = require('../ws');

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/', async (req, res) => {
  const rows = await userModel.singleByUserId(req.body.id);
  const userInfo = rows[0];
  let response = await remindModel.get(userInfo.account_num);
  console.log(response);
  await res.status(200).json({response});
});

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/count', async (req, res) => {
  let rows = await remindModel.count(req.body.id);
  await res.status(200).json({error: 0, ...rows[0]});
});

router.delete('/', async (req, res) => {
  console.log('router.delete', req.body)
  const userDebt = await userModel.singleByUserId(req.body.userDebtId);
  const userDebtInfo = userDebt[0];

  const owner = await remindModel.getOwnerId(req.body.debtId);
  const ownerInfo = owner[0];

  let alertData = {
    alertType: 3,
    recipient: ownerInfo.owner_id,
    ownerAccNum: userDebtInfo.account_num,
    ownerName: userDebtInfo.name,
    message: req.body.message,
  }

  let item = await remindModel.delete(req.body.debtId)
  let ret = {
    item,
    msg: 'successfully'
  }
  let errorCode = 200;
  await res.status(errorCode).json(ret);


  console.log(alertData);
  broadcastAll(JSON.stringify(alertData));
})


module.exports = router;