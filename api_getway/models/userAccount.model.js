const bcrypt = require('bcryptjs')
const db = require('../utils/db')
const {PW_SEED} = require('../config')
const {SQL_SCHEMA} = require('../utils/common')
const TABLE_NAME = SQL_SCHEMA.TABLE.USER

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
}