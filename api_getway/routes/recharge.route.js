const express = require('express');
const bankingAccountModel = require('../models/bankingAccount.modal');
const userModel = require('../models/user.model');
const router = express.Router();

router.post('/', async (req, res) => {
  // req.body = {
  //   "account_num": "0725174389964",
  //   "money": 30000000
  // };
  const userInfo = await userModel.singleByAccountNum(req.body.account_num);
  let uid = userInfo[0].id;
  console.log("uid", uid);
  const bankingInfos = await bankingAccountModel.get(uid);
  const surplus = parseInt(bankingInfos[0].surplus);
  const total = parseInt(req.body.money) + surplus;
  let entity = {
    surplus: total
  };
  const item = await bankingAccountModel.update(uid, entity);

  console.log("backing Update", item);
  if (item.affectedRows == 1) {
    res.status(200).json({
      msg: 'successfully',
      errorCode: 0
    });
  } else {
    res.status(501).json({
      "msg": "failure",
      "errorCode": -201
    });
  }
});

module.exports = router;