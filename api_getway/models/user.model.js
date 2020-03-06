const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const {PW_SEED} = require('../config')

module.exports = {
    // add: entity => {
    //   // entity = {
    //   //   f_Username: "test",
    //   //   f_Password: "test",
    //   //   f_Name: "test",
    //   //   f_Email: "test@test.c",
    //   //   f_DOB: "2000-09-01",
    //   //   f_Permission: 0
    //   // }
    //   const hash = bcrypt.hashSync(entity.f_Password, PW_SEED);
    //   entity.f_Password = hash;
    //   return db.add(entity, 'users')
    // },

    singleByUserName: userName => db.load(`select * from user_info where user_name = '${userName}'`),
    singleByUserId: uId => db.load(`select * from user_info where id = '${uId}'`),
    singleByAccountNum: accountNumber => db.load(`select * from user_info where account_num = '${accountNumber}'`),
    singleByUser: (userName, accountNumber) => db.load(`select * from user_info where user_name = '${userName}' or account_num = '${accountNumber}'`),
}
