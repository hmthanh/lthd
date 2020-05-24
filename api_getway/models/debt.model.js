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
      SELECT distinct d.id, u.name, d.account_num, d.debt_val, d.date_time, d.note 
      FROM debt_info d
      JOIN user_account u ON d.owner_id = u.id
      WHERE d.is_pay=0 AND d.owner_id=${id}`)
  },

  getAccountDept: (id) => {
    return db.load(`
      SELECT d.account_num
      FROM debt_info d
      WHERE d.id=${id}`)
  },
 
  searching: (val, acc) => {
    return db.load(`
     SELECT d.account_num, d.debt_val, d.date_time, d.owner_id
     FROM debt_info d
     WHERE d.owner_id LIKE '%${val}%' `)
  },
  getByid: (id) => {
    return db.load(`
    SELECT *
    FROM debt_info
    WHERE id=${id}`)
  },
  delete: (id) => {
    return db.del({id: id}, 'debt_info')
  },
};
