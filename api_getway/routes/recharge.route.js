const express = require('express')
const bankingAccountModel = require('../models/bankingAccount.modal')
const userModel = require('../models/user.model')
const { getAccount } = require('../models/account.model')
const common = require('../utils/common')
const moment = require('moment')
const { TranferToAccount } = require('../models/transaction.Tranfer.Model')
const router = express.Router()

const validateParams = (data) => {
  if(!common.required(data.uid)) return false
  if(!common.required(data.accountNum)) return false
  if(!common.required(data.amount)) return false
  return true
}

router.post('/', async (req, res) => {
  console.log(req.body)
  const isValid = validateParams(req.body)
  if (!isValid) {
    res.status(200).json({
      msg: 'invalid params',
      errorCode: -200,
    })
    return
  }
  // check from valid account
  const rows = await getAccount(req.body.uid) 
  if (!rows || rows.length == 0) {
    res.status(200).json({
      msg: 'uid not exists',
      errorCode: -202,
    })
  } else {
    const employee = rows[0]
    // check role staff
    if (employee.role > 2) {
      res.status(200).json({
        msg: 'permistion employee require',
        errorCode: -203,
      })
    } else {
      let userInfo = await userModel.singleByAccountNum(req.body.accountNum)
      if(!userInfo || userInfo.length === 0) {
        res.status(200).json({
          msg: 'account not exists',
          errorCode: -205,
        })
        return
      }
      let entity = {
        acc_name: employee.name,
        amount: req.body.amount,
        to_account: req.body.accountNum,
        note: 'Chuyển tiền tại quầy',
        type: 1,
        timestamp: moment(new Date()).valueOf(),
        partner_code: 0,
        state: 0
      }
      TranferToAccount(entity)
      .then(rsl => {
        res.status(200).json({
          msg: 'sucessfully',
          errorCode: 0,
          results: {
            ...rsl,
            timestamp: entity.timestamp,
            state:'Thành Công'
          }
        })

      }).catch(err => {
        console.log(err)
        res.status(200).json({
          msg: 'internal error',
          errorCode: -209,
        })
      })
    }
  }
});

module.exports = router;