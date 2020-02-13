const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const { convertStrToDate } = require('../utils/common');
const { PW_SEED } = require('../config')

module.exports = {
  add: entity => {
    entity['date_of_birth'] = convertStrToDate(entity['date_of_birth'])
    let rawPw = entity.password
    //console.log('entity.password', entity.password, 'rawPw', rawPw)
    const salt = bcrypt.genSaltSync(PW_SEED);
    const hashPwd = bcrypt.hashSync(rawPw, salt);
    entity.password = hashPwd
    // console.log('entity.password', entity.password, 'salt', salt)
    // console.log (bcrypt.compareSync(entity.password, rawPw)) 
    // console.log('bcrypt.compareSync', entity.password, 'rawPw', rawPw)
    
    return db.add(entity, 'user_info')
  },
  updateAccount: (id, entity) => {
    return db.patch(entity, {id: id}, 'user_info')
  },
  getInfoBanking: (id) => {
    return db.load(`Select * from banking_account where owner_id=${id}`)
  }
};
