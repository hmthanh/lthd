const express = require('express');
const remindModel = require('../models/remind.model');
const notifyModel = require('../models/notify.model')
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
  console.log(req.body);
  let rows = await remindModel.count(req.body.id);
  await res.status(200).json({error: 0, ...rows[0]});
});

router.delete('/', async (req, res) => {
  console.log('router.delete', req.body)
  const userDebt = await userModel.singleByUserId(req.body.userDebtId);
  const userDebtInfo = userDebt[0];

  const owner = await remindModel.getOwnerId(req.body.debtId);
  const ownerInfo = owner[0];

  let notify = {
    type: 3,
    recipient: ownerInfo.owner_id,
    account_id: userDebtInfo.account_num,
    name: userDebtInfo.name,
    money: 0,
    message: req.body.message,
    debt_id: req.body.debtId
  }
  const delDebt = await notifyModel.deleteByDebtId(req.body.debtId);
  let update = await notifyModel.add(notify);
  console.log("notify update", update);

  let item = await remindModel.delete(req.body.debtId)
  await res.status(200).json({
    item,
    msg: 'successfully'
  });
  broadcastAll(JSON.stringify(notify));
})

router.post('/notify', async (req, res) => {
  const user = await userModel.singleByUserId(req.body.id);
  const userInfo = user[0];
  let response = await remindModel.getRemind(req.body.id);
  console.log(response);
  await res.status(200).json(response);
});

module.exports = router;