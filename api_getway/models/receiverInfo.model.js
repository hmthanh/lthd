const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'receiver_info')
  },

  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'receiver_info')
  },

  get: (id) => {
    return db.load(`
      SELECT * FROM receiver_info WHERE owner_id=${id}`)
  },

  countAcc: (acc) => {
    return db.load(`
      SELECT COUNT(*) as num FROM receiver_info WHERE account_num=${acc}`)
  },

  searching: (val, acc) => {
    return db.load(`
      SELECT u.name, b.account_num 
      FROM user_account u
      JOIN banking_info b ON b.owner_id = u.id
      WHERE u.name LIKE '%${val}%' OR b.account_num LIKE '%${acc}%'`)
  },

  delete: (id) => {
    return db.del({id: id}, 'receiver_info')
  },

  getByPartner: (id, partnerCode) => {
    return db.load(`
      SELECT * 
      FROM receiver_info 
      WHERE owner_id=${id} AND partner_bank=${partnerCode}`)
  },
};
