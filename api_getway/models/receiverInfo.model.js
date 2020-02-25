const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'receiver_info')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'receiver_info')
  },
  get: (id) => {
    return db.load(`Select * from receiver_info where owner_id=${id}`)
  },
  searching: (val, acc) => {
    return db.load(`Select name, account_num from user_info u where u.name like '%${val}%' or u.account_num like '%${acc}%'`)
  },
  delete: (id) => {
    return db.del({id: id}, 'receiver_info')
  },
};
