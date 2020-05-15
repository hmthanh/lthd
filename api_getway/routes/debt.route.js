

const express = require('express')
const debtModel = require('../models/debt.model')
const userModel = require("../models/user.model");
const {getInfoByAccountFull} = require('../models/account.model')
const router = express.Router()
const {broadcastAll} = require("../ws");

// post để lấy tất cả các record trong db. do front end dùng post không dùng get
router.post('/:id', async (req, res) => {
  let rows = await debtModel.get(req.params.id)
  await res.status(200).json({error: 0, item: rows})

  // broadcastAll(JSON.stringify({msg: 'test broadcastAll message'}))
})

// post để tạo 1 record mới
router.post('/', async (req, res) => {
  // console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    date_time: new Date(req.body.datetime),
    debt_val: req.body.money,
    note: req.body.message
  }
  let ret, errorCode, item = null
  let rows = await debtModel.add(entity)
  if (rows) item = entity
  console.log('await', rows)
  errorCode = 200
  let msg = 'successfully'

  ret = {
    item,
    msg
  }
  await res.status(errorCode).json(ret)

  const owner = await userModel.singleByUserId(req.body.ownerId);
  const ownerInfo = owner[0];

  let debtor = await getInfoByAccountFull(req.body.accountNum);
  if (debtor.length === 0) {
    let q = req.body.account_num.slice(0, -1)
    debtor = await getInfoByAccountFull(q);
  }
  let debtorInfo = debtor[0];

  let alertData = {
    alertType:1,
    recipient: debtorInfo.id,
    ownerId: ownerInfo.id,
    ownerAccNum: ownerInfo.account_num,
    ownerName: ownerInfo.name,
    money: req.body.money,
    message: req.body.message
  }
  console.log(alertData);
  broadcastAll(JSON.stringify(alertData))
})

// update 1 record
router.patch('/', async (req, res) => {
  console.log("result", req.body) // cái nào cần update thì lấy cái đó thôi
  let entity = {
    note: req.body.note,
    is_remind: 1
  }
  const item = await debtModel.update(req.body.uid, entity)

  let ret, errorCode = 200
  let msg = 'successfully'
  ret = {
    item: '',
    msg
  }
  res.status(errorCode).json(ret);
})

// xóa 1 record
router.delete('/', async (req, res) => {
  console.log('router.delete', req.body)
  const owner = await userModel.singleByUserId(req.body.ownerId);
  const ownerInfo = owner[0];

  const debtor = await debtModel.getUserDebt(req.body.debtId);
  const debtorInfo = debtor[0];

  let alertData = {
    alertType: 2,
    recipient: debtorInfo.id,
    ownerAccNum: ownerInfo.account_num,
    ownerName: ownerInfo.name,
    message: req.body.message,
  }

  let item = await debtModel.delete(req.body.debtId)
  let ret = {
    item,
    msg: 'successfully'
  }
  let errorCode = 200;
  await res.status(errorCode).json(ret);


  console.log(alertData);
  broadcastAll(JSON.stringify(alertData));
})


module.exports = router