const express = require('express')
const debtModel = require('../models/debt.model')
const userModel = require("../models/user.model");
const notifyModel = require('../models/notify.model')
const moment = require('moment')
const {getAccountInfo, getAccount} = require('../models/account.model')
const router = express.Router()
const {broadcastAll} = require("../ws");

// Lấy danh sách nhắc nợ có is_pay = 0
router.post('/:id', async (req, res) => {
  let rows = await debtModel.get(req.params.id)
  await res.status(200).json({error: 0, item: rows})
})

// Tạo 1 nhắc nợ
router.post('/', async (req, res) => {
  // console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    date_time: moment(new Date()).valueOf(),
    debt_val: req.body.money,
    note: req.body.message
  }
  let item = null
  let debtInfo = await debtModel.add(entity)
  if (debtInfo) item = entity
  // console.log('await', debtInfo)

  const owner = await userModel.singleByUserId(req.body.ownerId);
  const ownerInfo = owner[0];
  let debtor = await getAccountInfo(req.body.accountNum);
  
  let debtorInfo = debtor[0];
  let notify = {
    type: 1,
    recipient: debtorInfo.id,
    account_id: ownerInfo.account_num,
    name: ownerInfo.name,
    money: req.body.money,
    message: req.body.message,
    debt_id: debtInfo.insertId
  }
  let update = await notifyModel.add(notify);
  // console.log("notify update", update);

  broadcastAll(JSON.stringify(notify))
  await res.status(200).json({
    item,
    msg: 'successfully'
  })
})

// update 1 record
router.patch('/', async (req, res) => {
  console.log("result", req.body) // cái nào cần update thì lấy cái đó thôi
  let entity = {
    note: req.body.note,
    is_remind: 1
  }
  const item = await debtModel.update(req.body.uid, entity)

  await res.status(200).json({
    item: item,
    msg: 'successfully'
  });
})

// Hủy nhắc nợ
router.delete('/', async (req, res) => {
  console.log("body", req.body);
  const owner = await userModel.singleByUserId(req.body.ownerId)
  const ownerInfo = owner[0]
  let acc = await debtModel.getAccountDept(req.body.debtId)
  acc = acc[0]
  const debtor = await getAccountInfo(acc.account_num)
  const debtorInfo = debtor[0];
  let notify = {
    type: 2,
    recipient: debtorInfo.id,
    account_id: ownerInfo.account_num,
    name: ownerInfo.name,
    money: 0,
    message: req.body.message,
    debt_id: req.body.debtId
  }
  const delDebt = await notifyModel.deleteByDebtId(req.body.debtId);
  let update = await notifyModel.add(notify);

  broadcastAll(JSON.stringify(notify));

  let item = await debtModel.delete(req.body.debtId)
  await res.status(200).json({
    item,
    msg: 'successfully'
  });
})

// router.delete('/notify', async (req, res) => {
//   // console.log("body", req.body);
//   let acc = await debtModel.getByid(req.body.debtId)
//   acc = acc[0]
//   const debtor = await getAccount(acc.owner_id)
//   const debtorInfo = debtor[0];
//   let notify = {
//     type: 2,
//     recipient: debtorInfo.id,
//     account_id: acc.account_num,
//     name: acc.name,
//     money: 0,
//     message: req.body.message,
//     debt_id: req.body.debtId
//   }
//   const delDebt = await notifyModel.deleteByDebtId(req.body.debtId);
//   let update = await notifyModel.add(notify);

//   broadcastAll(JSON.stringify(notify));

//   let item = await debtModel.delete(req.body.debtId)
//   await res.status(200).json({
//     item,
//     msg: 'successfully'
//   });
// })


module.exports = router