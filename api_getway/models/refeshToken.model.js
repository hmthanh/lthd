const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const {convertStrToDate} = require('../utils/common');
const {PW_SEED} = require('../config')
const tableName = 'refresh'
module.exports = {
  add: entity => {
    return db.del({user_id: entity.user_id}, tableName).then(() => db.add(entity, tableName))
  },
  isExists: (id, token) => {
    return db.load(`
      SELECT * 
      FROM ${tableName} 
      WHERE user_id=${id} AND refresh_token=${token}`)
  },
  get: (id, refreshToken) => db.load(`
    SELECT * 
    FROM ${tableName} 
    WHERE user_id=${id} AND refresh_token='${refreshToken}'`)

};