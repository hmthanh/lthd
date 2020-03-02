const db = require('../utils/db')
module.exports = {
 plus: (entity) => db.add(entity, 'transaction_tranfer')
 
}
