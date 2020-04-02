const express = require('express')
const bankingAccountModel = require('../models/bankingAccount.modal')
const userModel = require('../models/user.model')
const { getInfoAccount } = require('../models/account.model')
const moment = require('moment')
const transferModel = require('../models/transfer.model')
const router = express.Router()

router.post('/', async (req, res) => {
  console.log(req.body);
  const rows = await getInfoAccount(req.body.uid)
  
  if (!rows || rows.length == 0) {
    res.status(200).json({
      msg: 'uid not exists',
      errorCode: -202,
    })
  } else {
    const employee = rows[0]
    const userInfo = await userModel.singleByAccountNum(req.body.account_num)
    let uid = userInfo[0].id
    console.log("uid", uid)
    const bankingInfos = await bankingAccountModel.get(uid)
    if (!bankingInfos || bankingInfos.length == 0) {
      res.status(200).json({
        msg: `account_num: ${account_num} not exists`,
        errorCode: -203,
      })
    } else {
      const bankingInfo = bankingInfos[0]
      const surplus = parseInt(bankingInfo.surplus)
      const total = parseInt(req.body.money) + surplus
      let entity = {
        surplus: total
      }

      // ghi vào bảng transaction_tranfer
      const entityTF = {
        acc_name: employee.name,
        from_account: '',
        to_account: req.body.account_num,
        note: 'Chuyển tiền tại quầy',
        amount: req.body.money,
        partner_code: '',
        timestamp: moment().valueOf(new Date()),
        surplus: surplus
      }
      const insertVal = await transferModel.add(entityTF)

      // update số dư
      
      const item = await bankingAccountModel.update(uid, entity)

      console.log("backing Update", item)
      if (item.affectedRows == 1) {
        await transferModel.done(insertVal.insertId)
        res.status(200).json({
          msg: 'successfully',
          errorCode: 0
        })
      } else {
        res.status(501).json({
          "msg": "failure",
          "errorCode": -201
        })
      }

    }
  }
});

module.exports = router;