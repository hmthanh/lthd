const db = require('../utils/db')

module.exports = {
  get: (accountNum, from, count) => {
    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state 
      FROM transaction_tranfer t 
      WHERE t.from_account='${accountNum}'
      ORDER BY t.timestamp DESC LIMIT ${from}, ${count}`)
  },
  getTrans: (accountNum) => {
    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state
      FROM transaction_tranfer t 
      WHERE t.from_account='${accountNum}' 
      ORDER BY t.timestamp DESC`)
  },
  getReceive: (accountNum) => {
    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state 
      FROM transaction_tranfer t
      WHERE t.to_account='${accountNum}' 
      ORDER BY t.timestamp DESC`)
  },
  getall: (type) => {
    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state 
      FROM transaction_tranfer t
      WHERE t.type=${type} 
      ORDER BY t.timestamp DESC`)
  },
  getByAccountNum: (accountNum, type) => {
    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state 
      FROM transaction_tranfer t 
      WHERE t.type=${type} AND t.from_account='${accountNum}' OR t.to_account='${accountNum}'
      ORDER BY t.timestamp DESC`)
  },
};
