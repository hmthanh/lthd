const express = require('express');
const jwt = require('jsonwebtoken');
const rndToken = require('rand-token');
const authModel = require('../models/auth.model');
const common = require('../utils/common');
const accountModel = require('../models/account.model');
const receiverModel = require('../models/receiverInfo.model');
const userModel = require('../models/user.model');


const router = express.Router();

function validateReceiverData(data) {
  if (!common.required(data['id'])) return false;
  if (!common.required(data['accountNum'])) return false;
  if (!common.isNumber(data['accountNum'])) return false;

  return true
}

router.post('/', async (req, res) => {
  console.log(req.body);
  let data = {...req.body};
  let DoB = data['date_of_birth'];
  const isValid = common.validate(data);
  let ret, errorCode, item, msg = null;
  if (isValid) {
    let results = await accountModel.add(data);
    let insertId = results.insertId;
    let name = common.nonAccentVietnamese(data.name);
    let userName = name.split(' ').join('') + insertId;
    let accountNum = common.genagrateAccountNumber(insertId, DoB);
    await accountModel.updateAccount(insertId, {user_name: userName, account_num: accountNum});
    item = {
      id: 1,
      ...req.body,
      accountNum,
      userName
    };
    msg = 'successfully';
    errorCode = 200
  } else {
    errorCode = 400;
    msg = 'invalid parameters'
  }
  ret = {
    item,
    msg
  };
  res.status(errorCode).json(ret)
});

router.post('/id', async (req, res) => {
  console.log(req.body);
  let info = await accountModel.getInfoBanking(req.body.id);
  let account = await accountModel.getInfoAccount(req.body.id);
  let errorCode = 400;
  let ret = {
    msg: 'invalid parameters',
  };
  if (info && info.length != 0) {
    let saving_money = 0, main = 0;
    errorCode = 200;
    for (let i = 0; i < info.length; i++) {
      item = info[i];
      if (item.type == 1) main += item.surplus;
      else saving_money += item.surplus
    }
    ret = {
      msg: 'successfully',
      saving_money,
      main,
      account: account[0]
    }
  }
  res.status(errorCode).json(ret)
});

// create receiver_info
router.post('/ref/account', async (req, res) => {
  const isValid = validateReceiverData(req.body);
  let errorCode = 400;
  let ret = {
    msg: 'invalid parameters',
  };
  if (isValid) {
    let user = userModel.singleByAccountNum(req.body.accountNum);
    let entity = {
      owner_id: req.body.id,
      account_id: user.id,
      alias_name: req.body.aliasName
    };
    let newReceiver = await receiverModel.add(entity);
    errorCode = 200;
    ret = {
      msg: 'successfully',
      newReceiver: entity
    }
  }
  res.status(errorCode).json(ret)
});
// get all receiver_info by uid
router.post('/ref/account/id', async (req, res) => {
  let receivers = receiverModel.get(req.body.id);
  let errorCode = 200;
  let ret = null;
  if (receivers) {
    ret = {
      msg: 'successfully',
      receivers
    }

  } else {
    ret = {
      msg: 'not found uid',
      receivers
    }
  }
  res.status(errorCode).json(ret)
});

// get account Num
router.post('/:id', async (req, res) => {
  console.log(req.params.id);

  let user = await userModel.singleByUserId(req.params.id);
  // console.log('get account Num', user)
  let errorCode = 200;
  let ret = {
    errorCode: 0,
    msg: 'successfully',
    item: user[0]
  };

  res.status(errorCode).json(ret)
});

module.exports = router;