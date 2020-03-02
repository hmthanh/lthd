const db = require('../utils/db')
module.exports = {
 add: (entity) => db.add(entity, 'transaction_tranfer')
 
}
