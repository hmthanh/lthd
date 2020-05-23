const bcrypt = require('bcryptjs')
const db = require('../utils/db')
const {PW_SEED} = require('../config')
const TABLE_NAME = 'user_account'

module.exports = {
  add: entity => {
    let rawPw = entity.password
    const salt = bcrypt.genSaltSync(PW_SEED)
    const hashPwd = bcrypt.hashSync(rawPw, salt)
    entity.password = hashPwd
    return db.add(entity, TABLE_NAME)
  },

  countUserName: (userName) => {
    return db.load(`
      SELECT COUNT(*) as num
      FROM ${TABLE_NAME}
      WHERE user_name LIKE '${userName}%'`)
  },

  updatePwd: (rawPw, uid) => {
    const salt = bcrypt.genSaltSync(PW_SEED)
    const hashPwd = bcrypt.hashSync(rawPw, salt)
    return db.patch({password: hashPwd, status: 1}, {id: uid}, TABLE_NAME)
  },
  // updateAccount: (id, entity) => db.patch(entity, {id: id}, 'user_account'),
  // getInfoBanking: (id) => db.load(`Select * from banking_info where owner_id=${id}`),

  // getInfoAccount: (uId) => db.load(`select u.account_num, b.id, b.surplus, b.type from user_account u join banking_info b on u.id = b.owner_id
  // where u.id = '${uId}'`),

  // getReceiverById: (uId) => db.load(`select u.account_num, b.id, b.surplus, b.type, u.name, u.email from user_account u join banking_info b on
  // u.id = b.owner_id where u.id = '${uId}' AND b.type=1`),

  // getAccount: (uId) => db.load(`select * from user_account where id='${uId}'`),

  // setDefaultAccount: (id) => {
  //   let entity = {
  //     owner_id: id,
  //     surplus: 0,
  //     type: 1
  //   }
  //   db.add({...entity}, 'banking_info')
  //   entity.type = 2
  //   db.add(entity, 'banking_info')
  // },
  // getInfoByAccount: (acc) => db.load(`SELECT u.account_num, u.name, u.email FROM user_account u WHERE u.account_num='${acc}' OR u.user_name='${acc}'`),
  // getIdByAccountNum: (acc) => db.load(`SELECT u.id FROM user_account u WHERE u.account_num='${acc}'`),
  // getInfoByAccountFull: (acc) => db.load(`SELECT * FROM user_account u WHERE u.account_num='${acc}' OR u.user_name='${acc}'`),
};