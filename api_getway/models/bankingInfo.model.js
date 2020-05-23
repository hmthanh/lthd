const db = require('../utils/db')
const TABLE_NAME = 'banking_info'

module.exports = {
  add: entity => {
    return db.add(entity, TABLE_NAME)
  },

  getInfoAccount: id =>  db.load(`
      SELECT *
      FROM ${TABLE_NAME}
      WHERE owner_id=${id} AND is_close=${0} ORDER BY type`)
  ,
  update: (entity, condition) => db.patch(entity, condition, TABLE_NAME),
  getInfoAccountByAccNum: accNum => db.load(`
      SELECT *
      FROM ${TABLE_NAME}
      WHERE account_num=${accNum} AND is_close=0`),

  countAccountAcctivate: id => db.load(`
  SELECT COUNT(*) as num
  FROM ${TABLE_NAME} as b JOIN user_account u ON b.owner_id = u.id
  WHERE u.id=${id} AND is_close=${0}`),
  
}