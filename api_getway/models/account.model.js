const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const { convertStrToDate } = require('../utils/common');
const { PW_SEED } = require('../config')

module.exports = {
  add: entity => {
    entity['date_of_birth'] = convertStrToDate(entity['date_of_birth'])
    const hash = bcrypt.hashSync(entity.password, PW_SEED);
    entity.password = hash;
    return db.add(entity, 'user_info')
  },
  updateAccount: (id, entity) => {
    return db.patch(entity, {id: id}, 'user_info')
  },
  getInfoBanking: (id) => {
    return db.load(`Select * from banking_account where owner_id=${id}`)
  }
};
