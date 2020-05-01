const db = require('../utils/db')

module.exports = {
  get: (accountNum) => {
    return db.load(`SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state FROM transaction_tranfer t where t.from_account='${accountNum}' OR t.to_account='${accountNum}' order by t.timestamp DESC`)
  },
  getTrans: (accountNum) => {
    return db.load(`SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state FROM transaction_tranfer t where t.from_account='${accountNum}' order by t.timestamp DESC`)
  },
  getReceive: (accountNum) => {
    return db.load(`SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state FROM transaction_tranfer t where t.to_account='${accountNum}' order by t.timestamp DESC`)
  },
  getall: (type) => {
    return db.load(`SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state FROM transaction_tranfer t where t.type=${type} order by t.timestamp DESC`)
  },
  getByAccountNum: (accountNum, type) => {
    return db.load(`SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state FROM transaction_tranfer t where t.type=${type} AND t.from_account='${accountNum}' OR t.to_account='${accountNum}' order by t.timestamp DESC`)
  },
};
