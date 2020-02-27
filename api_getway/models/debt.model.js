const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'debt_info')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'debt_info')
  },
  get: (id) => {
    return db.load(`Select * from debt_info where owner_id=${id}`)
  },
  searching: (val, acc) => {
    return db.load(`Select account_num, debt_val, date_time,owner_id from debt_info d where d.owner_id like '%${val}%' `)
  },
  delete: (id) => {
    return db.del({id: id}, 'debt_info')
  },
};
