const express = require('express')
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')
const authModel = require('../models/auth.model')
const common = require('../utils/common')
const accountModel = require('../models/account.model')

const router = express.Router()

function validate(data) {
    if(!common.validEmail(data['email'])) return false
    if(!common.isNumber(data['phone'])) return false
    if(!common.required(data['name'])) return false
    if(!common.required(data['date_of_birth'])) return false
    data['phone'] = '84' + (+data['phone'])
    let DoB = data['date_of_birth']
    data['password'] = DoB.split('-').join('')
    return true
}

router.post('/', async (req, res) => {  
    let data = {...req.body}
    let DoB = data['date_of_birth']
    const isValid = validate(data)
    let ret, errorCode, item = null
    if(isValid) {
        let results = await accountModel.add(data); 
        let insertId = results.insertId
        let name = common.nonAccentVietnamese(data.name)
        let userName = name.split(' ').join('') + insertId
        let accountNum = common.genagrateAccountNumber(insertId, DoB)
        await accountModel.updateAccount(insertId, {user_name: userName, account_num: accountNum})
        item = {
            id: 1,
            ...req.body,
            accountNum,
            userName
        }
        msg = 'successfully'
        errorCode = 201
    }
    else {
        errorCode = 400
        msg = 'invalid parameters'
    }
    ret = {
        item,
        msg
    }
    res.status(errorCode).json(ret)
})
  
module.exports = router