const db = require('../utils/db')

module.exports = {

  get: (accountId) => {
    return db.load(`SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state FROM transaction_tranfer t where t.from_account='${accountId}' OR t.to_account='${accountId}'`)
  }
};
