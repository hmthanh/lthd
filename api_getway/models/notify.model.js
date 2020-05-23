const db = require('../utils/db')
const TABLE = 'notify'
module.exports = {
    add: entity => {
        return db.add(entity, TABLE)
    },
    get: (id) => {
        return db.load(`Select * from ${TABLE} n where id=${id}`)
    },
    getByRecipientId: (id) => {
        return db.load(`Select * from ${TABLE} n where recipient=${id}`)
    },
    delete: (id) => {
        return db.del({id: id}, TABLE)
    },
    deleteByDebtId: (debt_id) => {
        return db.del({debt_id: debt_id}, TABLE)
    },
};
