const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'user_info')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'user_info')
  },
  get: () => {
    return db.load(`Select * from user_info`)
  },
  searching: (val) => {
    return db.load(`Select * from user_info u where u.email like '%${val}%' `)
  },
  delete: (id) => {
    return db.del({id: id}, 'user_info')
  },
};