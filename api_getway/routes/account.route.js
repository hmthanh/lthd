const express = require('express');
const jwt = require('jsonwebtoken');
const rndToken = require('rand-token');
const authModel = require('../models/auth.model');
const common = require('../utils/common');
const accountModel = require('../models/account.model');

const router = express.Router();

function validate(data) {
    if(!common.validEmail(data['email'])) return false
    if(!common.isNumber(data['phone'])) return false
    if(!common.required(data['name'])) return false
    if(!common.required(data['date_of_birth'])) return false
    data['phone'] = '84' + (+data['phone'])
    return true
}

router.post('/', async (req, res) => {  
    // console.log(req.body)
    const val = validate(req.body)
    let ret, errorCode, item = null
    if(val) {
        let DoB = req.body['date_of_birth']
        let results = await accountModel.add(req.body);
        let accountNum = common.genagrateAccountNumber(results.insertId, DoB)
        console.log('acountNum: ' + accountNum)
        item = {
            id: 1,
            ...req.body,
            accountNum,
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
  
module.exports = router;