const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const {convertStrToDate} = require('../utils/common');
const {PW_SEED} = require('../config');

module.exports = {
  add: entity => {
    entity['date_of_birth'] = convertStrToDate(entity['date_of_birth']);
    let rawPw = entity.password
    const salt = bcrypt.genSaltSync(PW_SEED)
    const hashPwd = bcrypt.hashSync(rawPw, salt)
    entity.password = hashPwd
    return db.add(entity, 'user_account')
  },
  updatePwd: (rawPw, uid) => {
    const salt = bcrypt.genSaltSync(PW_SEED)
    const hashPwd = bcrypt.hashSync(rawPw, salt)
    return db.patch({password: hashPwd, status: 0}, {id: uid}, 'user_account')
  },
  updateAccount: (id, entity) => db.patch(entity, {id: id}, 'user_account'),
  getInfoBanking: (id) => db.load(`
    SELECT *
    FROM banking_info b
    where b.owner_id=${id}`),

  getInfoAccount: (uId) => db.load(`
    SELECT b.account_num, b.id, b.surplus, b.type 
    FROM user_account u
    JOIN banking_info b ON u.id = b.owner_id
    WHERE u.id = '${uId}'`),

  getReceiverById: (uId) => db.load(`
    SELECT b.account_num, b.id, b.surplus, b.type, u.name, u.email
    FROM user_account u 
    JOIN banking_info b ON u.id = b.owner_id
    WHERE u.id = '${uId}' AND b.type=1`),

  getAccount: (uId) => db.load(`
    SELECT *
    FROM user_account
    WHERE id='${uId}'`),

  setDefaultAccount: (id) => {
    let entity = {
      owner_id: id,
      surplus: 0,
      type: 1
    }
    db.add({...entity}, 'banking_info')
    entity.type = 2
    db.add(entity, 'banking_info')
  },

  getInfoByAccount: (acc) => db.load(`
    SELECT b.account_num, u.name, u.email
    FROM user_account u
    JOIN banking_info b ON u.id = b.owner_id
    WHERE b.account_num='${acc}' OR u.user_name='${acc}'`),

  getIdByAccountNum: (acc) => db.load(`
    SELECT u.id
    FROM user_account u
    WHERE b.account_num='${acc}'`),

  getInfoByAccountFull: (acc) => db.load(`
    SELECT *
    FROM user_account u
    WHERE b.account_num='${acc}' OR u.user_name='${acc}'`),
};
