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
  getAll: (type) => {
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

  getAllHist: (offset, count, from, to, partner, type) => {
    let q = partner !== 0 ? `AND t.partner_code=${partner}` : '';
    let qType = type !== 0 ? `AND t.type=${type}` : '';
    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state, t.signature
      FROM transaction_tranfer t
      WHERE t.timestamp >= ${from} AND t.timestamp <= ${to} ${q} ${qType}
      ORDER BY t.timestamp DESC LIMIT ${offset},${count}`)
  },

  countRow: (offset, count, from, to, partner, type) => {
    let q = partner !== 0 ? `AND t.partner_code=${partner}` : '';
    let qType = type !== 0 ? `AND t.type=${type}` : '';
    return db.load(`
      SELECT COUNT(t.trans_id) as total_row
      FROM transaction_tranfer t
      WHERE t.timestamp >= ${from} AND t.timestamp <= ${to} ${q} ${qType}`)
  },

  getAllHistByUid: (offset, count, from, to, account, type, partner) => {
    let q = type !== 0 ? `AND t.type=${type}` : ''
    let q2 = partner !== 0 ? `AND t.partner_code=${partner}` : ''
    if (q2 != '') {
      if(partner === 7261) { // rsq
        q2 = `AND t.partner_code IN (5412,7261)`
      } else {
        q2 = `AND t.partner_code IN (6572, 0923)`
      }
    }

    return db.load(`
      SELECT t.trans_id, t.type, t.acc_name, t.from_account, t.to_account, t.amount, t.note, t.timestamp, t.surplus, t.state, t.signature
      FROM transaction_tranfer t
      WHERE t.timestamp >= ${from} AND t.timestamp <= ${to} AND (t.from_account IN ${account}
      OR t.to_account IN ${account}) ${q} ${q2} 
      ORDER BY t.timestamp DESC LIMIT ${offset},${count}`)
  },
};
