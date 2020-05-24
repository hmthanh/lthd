const express = require('express');
const receiverModel = require('../models/receiverInfo.model');
const {getAccountInfo} = require('../models/account.model')
const router = express.Router();

router.post('/', async (req, res) => {
  // console.log(req.body)
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    alias_name: req.body.aliasName,
    partner_bank: 0
  };
  // console.log('entity', entity);
  let account = await getAccountInfo(req.body.accountNum)
  // console.log(account)
  account = account[0]

  if (!account) {
    res.status(200).json({
      errorCode: -120,
      msg: 'account not exist'
    })
    return
  }
  let count = await receiverModel.countAcc(req.body.accountNum)
  count = count[0].num
  if(count > 0) {
    res.status(200).json({
      errorCode: -100,
      msg: 'account exist'
    })
    return
  }
  let item = null;
  if(!entity.account_num) {
    msg = 'invalid parameters, require userName or accountNum'
    errorCode = -201
  }
  else {
    if(!entity.alias_name || !entity.alias_name === '') entity.alias_name = account.name
    entity.name = account.name
    let rows = await receiverModel.add(entity);
    if (rows) item = entity
    errorCode = 0
    msg='successfully'
    // console.log('await', rows);
  }
  res.status(200).json({
    errorCode,
    item,
    msg
  });
});

router.post('/:id', async (req, res) => {
  let receiver = await receiverModel.get(req.params.id);
  // console.log(req.body)
  // let rows = await receiverModel.getByPartner(req.params.id, req.body.partnerCode);
  // res.status(200).json(rows)
  await res.status(200).json({
    errorCode: 0,
    msg: 'successfully',
    item:receiver
  })
});


router.patch('/', async (req, res) => {
  let ret, errorCode = 0, item;
  let entity = {
    account_num: req.body.accountNum,
    owner_id: req.body.ownerId,
    alias_name: req.body.aliasName
  };
  let account = await getAccountInfo(req.body.accountNum)
  // console.log(account)
  account = account[0]
  if(!entity.alias_name || !entity.alias_name === '') entity.alias_name = account.name
  if (!account) {
    res.status(200).json({
      errorCode: -120,
      msg: 'account not exist'
    })
    return
  } else {
    item = await receiverModel.update(req.body.id, entity);
    errorCode = 0
    msg = 'successfully'
  }
 
  ret = {
    errorCode,
    msg
  };
  res.status(200).json(ret)
});

router.delete('/', async (req, res) => {
  // console.log('router.delete', req.body);
  let ret, errorCode = 200, item = null;
  item = await receiverModel.delete(req.body.id);
  // console.log('router.delete', item);
  msg = 'successfully';
  ret = {
    errorCode: 0,
    item,
    msg
  };
  res.status(errorCode).json(ret)
});


module.exports = router;