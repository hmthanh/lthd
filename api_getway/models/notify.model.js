const db = require('../utils/db')

module.exports = {
    add: entity => {
        return db.add(entity, 'notify')
    },
    get: (id) => {
        return db.load(`Select * from notify n where id=${id}`)
    },
    getByRecipientId: (id) => {
        return db.load(`Select * from notify n where recipient=${id}`)
    },
    delete: (id) => {
        return db.del({id: id}, 'notify')
    },
    deleteByDebtId: (debt_id) => {
        return db.del({debt_id: debt_id}, 'notify')
    },
};
