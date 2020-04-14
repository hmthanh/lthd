const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'transaction_tranfer')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'transaction_tranfer')
  },
  get: () => {
    return db.load(`Select * from transaction_tranfer  `)
  },
  searching: (val) => {
    return db.load(`Select * from transaction_tranfer u where u.acc_name like '%${val}%'  `)
  },
  delete: (id) => {
    return db.del({id: id}, 'transaction_tranfer')
  },
};