const db = require('../utils/db')
// as num, u.name, d.debt_val, d.note, d.is_pay
//JOJN user_info as u on d.account_num = u.account_num
module.exports = {
  count: (id) => {
    return db.load(`SELECT count(d.owner_id) as num  FROM debt_info as d JOIN user_info as u on d.account_num = u.account_num WHERE u.id=${id} and d.is_pay=0` )
  },

  get: () => {
    return db.load(`SELECT u.name, d.debt_val, d.date_time, d.note FROM debt_info as d JOIN user_info as u on d.account_num = u.account_num WHERE u.account_num=07251441523064  order by d.id DESC`)
  },

};
