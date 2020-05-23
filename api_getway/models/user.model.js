const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const {PW_SEED} = require('../config');
const TABLE = 'user_account'

module.exports = {
  singleByUserName: username => db.load(`
    SELECT *
    FROM ${TABLE}
    WHERE user_name = '${username}'`),

  singleByEmail: email => db.load(`
    SELECT * 
    FROM ${TABLE} 
    WHERE email = '${email}'`),

  singleByUserId: uId => db.load(`
    SELECT *
    FROM ${TABLE} 
    WHERE id = '${uId}'`),

  singleByAccountNum: accountNumber => db.load(`
    SELECT * 
    FROM ${TABLE} u 
    JOIN banking_info b ON u.id = b.owner_id 
    WHERE b.account_num = '${accountNumber}'`),

  singleByUser: (userName, accountNumber) => db.load(`
    SELECT * 
    FROM ${TABLE} 
    JOIN banking_info b ON u.id = b.owner_id 
    WHERE u.user_name = '${userName}' OR b.account_num = '${accountNumber}'`),
};
