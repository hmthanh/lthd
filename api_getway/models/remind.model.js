const db = require('../utils/db')

module.exports = {
    get: (account_num) => {
        return db.load(`Select count(d.id) as num from debt_info d join user_info u on d.account_num = u.account_num where d.account_num=${account_num} and d.is_remind = 1`)
    },

};
