const express = require('express');
const moment = require('moment');

// const events = require('./events');
const {broadcastAll} = require('../ws')

const router = express.Router();

const validate = data => {
    const ownerId = data.ownerId
    const refId = data.refId
    const accountName = data.accountName
    const messsage = data.messsage
    const amount = data.amount

    if (!ownerId || !refId || !accountName || !messsage || !amount) return null;
    return {
        owner_id: ownerId,
        ref_id: refId,
        account_name: accountName,
        messsage: messsage,
        amount: amount
    }
}

router.post('/', (req, res) => {
    // req.body.id uid
    // table struct debt_user:  id | owner_id | ref_id | account_name | messsage | amount | is_pay (default = 0)
    // select * from debt_user where owner_id = id and is_pay = 0
    // posst idd get Notify
})


router.post('/debt', (req, res) => {
    // req.body.ownerId
    // req.body.refId
    // req.body.accountName
    // req.body.messsage
    // req.body.amount
    // message debt
    let entity = validate(req.body)
    if (entity) {
        // insert db
        //broadcastAll({id: entity.owner_id, msg: `${entity.account_name} nhắc nợ bạn với số tiền là ${entity.amount}`})
    }
})

module.exports = router;