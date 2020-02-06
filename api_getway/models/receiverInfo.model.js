const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'receiver_info')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'receiver_info')
  },
  get: (id) => {
    return db.load(`Select * from receiver_info r join user_info u on r.account_id = u.id where owner_id=${id}`)
  },
  delete: (id, entity) => {
    return db.patch(entity, {id: id}, 'user_info')
  },
};
