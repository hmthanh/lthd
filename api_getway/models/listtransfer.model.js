const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'transaction_tranfer')
  },
  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'transaction_tranfer')
  },
  get: (from, count) => {
    return db.load(`Select * from transaction_tranfer order by timestamp desc LIMIT ${from} , ${count}`)
  },

  getByAssociate: (from, count) => {
    return db.load(`SELECT * FROM transaction_tranfer WHERE partner_code > 10 ORDER BY timestamp DESC LIMIT ${from} , ${count}`)
  },

  getByInternal: (from, count) => {
    return db.load(`SELECT * FROM transaction_tranfer WHERE partner_code < 10 ORDER BY timestamp DESC LIMIT ${from} , ${count}`)
  },

  searching: acc => {
    return db.load(`SELECT * FROM transaction_tranfer u WHERE u.acc_name LIKE '%${val}%'`)
  },
  searchByAcc: (accNum, from, count) => db.load(`SELECT * FROM transaction_tranfer u WHERE from_account='${accNum}' OR to_account='${accNum}' AND  ORDER BY timestamp DESC LIMIT ${from} , ${count}`),

  delete: (id) => {
    return db.del({id: id}, 'transaction_tranfer')
  },
};