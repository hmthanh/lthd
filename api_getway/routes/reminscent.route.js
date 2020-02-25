const express = require('express')
const receiverModel = require('../models/reminscent.model')
const { nonAccentVietnamese } = require('../utils/common')
const router = express.Router()


router.post('/', async (req, res) => {  
  // console.log(req.body)
  // let entity = {
  //   account_num: req.body.accountNum,
  //   ower_id: req.body.ownerId,
  //   alias_name: req.body.aliasName,
  //   partner_bank: req.body.banking
  // }
  // res.status(200).json({err:200, msg: '123'})
})

module.exports = router