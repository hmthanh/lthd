const db = require('../utils/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'banking_info')
  },

  update: (id, entity) => {
    return db.patch(entity, {owner_id: id}, 'banking_info')
  },

  get: (id) => {
    return db.load(`
        SELECT *
        FROM banking_info
        WHERE owner_id=${id}`)
  },

  delete: (id) => {
    return db.del({id: id}, 'banking_info')
  },

  updateByCondition: (condition, entity) => {
    return db.patch(entity, condition, 'banking_info')
  },

};