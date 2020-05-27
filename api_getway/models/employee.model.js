const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'user_account')
  },

  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'user_account')
  },

  get: () => {
    return db.load(`
      SELECT * 
      FROM user_account
      WHERE role = 2 `)
  },

  searching: (val) => {
    return db.load(`
      SELECT *
      FROM user_account u
      WHERE u.email LIKE '%${val}%' AND role = 2 `)
  },

  delete: (id) => {
    return db.del({id: id}, 'user_account')
  },
};