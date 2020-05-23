const db = require('../utils/db');
module.exports = {
  add: (entity) => db.add(entity, 'transaction_tranfer'),

  get: (transId) => db.load(`
    SELECT *
    FROM transaction_tranfer WHERE trans_id=${transId}`),
  done: (id) => db.load(`
    UPDATE transaction_tranfer
    SET state = 1 
    WHERE trans_id=${id}`)
};
