const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'debt_info')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'debt_info')
  },
  get: (id) => {
    return db.load(`
      SELECT d.id, u.name, b.account_num, d.debt_val, d.date_time, d.note 
      FROM debt_info d
      JOIN user_account u ON d.owner_id = u.id
      JOIN banking_info b ON u.id = b.owner_id
      WHERE d.is_pay=0 AND d.owner_id=${id}`)
  },
  getUserDebt: (id) => {
    return db.load(`
      SELECT u.id, d.id AS debt_id
      FROM debt_info d
      JOIN banking_info b ON d.account_num = b.owner_id
      JOIN user_account u ON b.owner_id = u.id
      WHERE d.id=${id}`)
  },
  searching: (val, acc) => {
    return db.load(`
     SELECT d.account_num, d.debt_val, d.date_time, d.owner_id
     FROM debt_info d
     WHERE d.owner_id LIKE '%${val}%' `)
  },
  delete: (id) => {
    return db.del({id: id}, 'debt_info')
  },
};
