const db = require('../utils/db')
module.exports = {
 add: (entity) => db.add(entity, 'transaction_tranfer'),
 get: (transId) => db.load(`select * from transaction_tranfer where trans_id=${id}`),
 done: (id) => db.load(`update transaction_tranfer set state = 1 where trans_id=${id}`)

 
}
