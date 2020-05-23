const db = require('../utils/db')
// as num, u.name, d.debt_val, d.note, d.is_pay
//JOJN user_account as u on d.account_num = u.account_num
module.exports = {
  count: (id) => {
    return db.load(`
        SELECT count(d.owner_id) as num 
        FROM debt_info d
        JOIN banking_info b ON b.account_num = d.account_num
        INNER JOIN user_account u ON b.owner_id = u.id
        WHERE u.id=${id} AND d.is_pay=0`)
  },

  get: (account_num) => {
    return db.load(`
      SELECT d.id, u.name, d.debt_val, d.date_time, d.note, u.account_num
      FROM debt_info d
      JOIN user_account u ON d.owner_id = u.id
      WHERE d.account_num=${account_num}
      ORDER BY d.id DESC`)
  },
  getRemind: (userId) => {
    return db.load(`
      SELECT *
      FROM debt_info d
      JOIN user_account u ON d.owner_id = u.id
      WHERE d.account_num=${userId}
      ORDER BY d.id DESC`)
  },
  delete: (id) => {
    return db.del({id: id}, 'debt_info')
  },
  getOwnerId: (id) => {
    return db.load(`
      SELECT d.owner_id
      FROM debt_info d
      JOIN user_account u ON d.account_num = u.account_num
      WHERE d.id=${id}`)
  },
};
