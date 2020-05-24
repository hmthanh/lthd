const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const {PW_SEED} = require('../config');
const TABLE = 'user_account'
const schema = require('../utils/common').SQL_SCHEMA

module.exports = {
  singleByUserName: username => db.load(`
    SELECT *
    FROM ${schema.TABLE.USER}
    WHERE ${schema.FEILD_NAME.USER.USER_NAME} = '${username}'`),

  singleByEmail: email => db.load(`
    SELECT * 
    FROM ${schema.TABLE.USER}
    WHERE ${schema.FEILD_NAME.USER.EMAIL} = '${email}'`),

  singleByUserId: uId => db.load(`
    SELECT *
    FROM ${schema.TABLE.USER}
    WHERE ${schema.FEILD_NAME.USER.ID} = '${uId}'`),

  singleByAccountNum: accountNumber => db.load(`
    SELECT * 
    FROM ${schema.TABLE.USER} u 
    JOIN ${schema.TABLE.BANKING_INFO} b ON u.${schema.FEILD_NAME.USER.ID} = b.${schema.FEILD_NAME.BANKING_INFO.OWNER}
    WHERE b.${schema.FEILD_NAME.BANKING_INFO.ACCOUNT_NUM} = '${accountNumber}'`),

  singleByUser: (userName, accountNumber) => db.load(`
    SELECT * 
    FROM ${schema.TABLE.USER} u 
    JOIN ${schema.TABLE.BANKING_INFO} b ON u.${schema.FEILD_NAME.USER.ID} = b.${schema.FEILD_NAME.BANKING_INFO.OWNER}
    WHERE u.${schema.FEILD_NAME.USER.USER_NAME} = '${userName}' OR b.${schema.FEILD_NAME.BANKING_INFO.ACCOUNT_NUM} = '${accountNumber}'`),
};
