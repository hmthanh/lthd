const db = require('../utils/db');

module.exports = {
    add: entity => {
        return db.add(entity, 'banking_account')
    },
    update: (id, entity) => {
        return db.patch(entity, {id: id}, 'banking_account')
    },
    get: (id) => {
        return db.load(`Select * from banking_account where owner_id=${id}`)
    },
    delete: (id) => {
        return db.del({id: id}, 'banking_account')
    }
};