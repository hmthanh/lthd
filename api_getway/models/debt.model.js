const db = require('../utils/db')

module.exports = {
    add: entity => {
        return db.add(entity, 'debt_info')
    },
    update: (id, entity) => {
        return db.patch(entity, {id: id}, 'debt_info')
    },
    get: (id) => {
        return db.load(`Select d.id, u.name, d.account_num, d.debt_val, d.date_time, d.note from debt_info d join user_info u on d.account_num = u.account_num where owner_id=${id}`)
    },
    getUserDebt: (id) => {
        return db.load(`Select u.id FROM debt_info as d JOIN user_info as u on d.account_num = u.account_num WHERE d.id=${id}`)
    },
    searching: (val, acc) => {
        return db.load(`Select account_num, debt_val, date_time,owner_id from debt_info d where d.owner_id like '%${val}%' `)
    },
    delete: (id) => {
        return db.del({id: id}, 'debt_info')
    },
};
