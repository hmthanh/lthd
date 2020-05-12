const express = require('express')
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')
const authModel = require('../models/auth.model')
const common = require('../utils/common')
const accountModel = require('../models/account.model')
const receiverModel = require('../models/receiverInfo.model')
const userModel = require('../models/user.model')
const {SECRET_TOKEN, OTP} = require('../config')
const mailController = require('../mailer/mail.controller')

const router = express.Router()

function validateReceiverData(data) {
  if (!common.required(data['id'])) return false
  if (!common.required(data['accountNum'])) return false
  if (!common.isNumber(data['accountNum'])) return false

  return true
}

router.post('/', async (req, res) => {
  let data = {...req.body};
  let DoB = data['date_of_birth'];
  const isValid = common.validate(data);
  let ret, errorCode, item, msg = null;
  if (isValid) {
    const pass = OTP.generate(SECRET_TOKEN);
    data.password = pass;
    let results = await accountModel.add(data);
    let insertId = results.insertId;
    let name = common.nonAccentVietnamese(data.name);
    let userName = name.split(' ').join('') + insertId;
    let accountNum = common.genagrateAccountNumber(insertId, DoB);
    await accountModel.updateAccount(insertId, {user_name: userName, account_num: accountNum});
    console.log(`userName: ${userName} default password: ${pass}`);
    let msg = common.msgLogingTemplate(data['name'], userName, pass);
    // console.log(sender.email, sender);
    const htmlmsg = common.htmlMsgLogingTemplate(data['name'], userName, pass);
    mailController.sentMail(data['email'], '[New Vimo][important !!!] Account Vimo', msg, htmlmsg);
    accountModel.setDefaultAccount(insertId);

    item = {
      id: insertId,
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
  let account = await accountModel.getInfoAccount(req.body.id);
  let ret = {
    errorCode: -201,
    msg: 'invalid parameters',
  };
  if (account && account.length != 0) {
    for (let i = 0; i < account.length; i++) {
      const item = account[i];
      item.account_num = item.account_num  + item.type;
    }
    ret = {
      errorCode: 0,
      msg: 'successfully',
      account: account
    }
  }
  await res.status(200).json(ret)
});

router.post('/acc', async (req, res) => {

  let account = await accountModel.getInfoByAccount(req.body.query)
  if (account.length === 0) {
    // try account
    let q = req.body.query.slice(0, -1)
    account = await accountModel.getInfoByAccount(q)
  }
  let ret = {
    errorCode: -201,
    msg: 'invalid parameters',
  };
  if (account && account.length !== 0) {
    const item = account[0];
    ret = {
      errorCode: 0,
      msg: 'successfully',
      account: item
    }
  }
  await res.status(200).json(ret)
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
  await res.status(errorCode).json(ret)
});
// get all receiver_info by uid
router.post('/ref/account/id', async (req, res) => {
  console.log(req.body);
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