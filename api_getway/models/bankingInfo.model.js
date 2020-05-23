const db = require('../utils/db')
const TABLE_NAME = 'banking_info'
module.exports = {

  add: entity => {
    return db.add(entity, TABLE_NAME)
  },

  getInfoAccount: id => {
    return db.load(`
      SELECT *
      FROM ${TABLE_NAME}
      WHERE owner_id=${id} AND is_close=${0} ORDER BY type`)
  }
};