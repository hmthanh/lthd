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
        return db.add(entity, 'user_info')
    },
    updateAccount: (id, entity) => db.patch(entity, {id: id}, 'user_info'),
    getInfoBanking: (id) =>  db.load(`Select * from banking_account where owner_id=${id}`),
    getInfoAccount: (uId) => db.load(`select u.account_num, b.id, b.surplus, b.type from user_info u join banking_account b on u.id = b.owner_id where u.id = '${uId}'`),
    getReceiverById: (uId) => db.load(`select u.account_num, b.id, b.surplus, b.type, u.name, b.surplus, u.email from user_info u join banking_account b on u.id = b.owner_id where u.id = '${uId}'`),
    getAccount: (uId) => db.load(`select * from user_info where id='${uId}'`),
    setDefaultAccount: (id) => {
      let entity = {
        owner_id: id,
        surplus: 0,
        type: 1
      }
      db.add({...entity}, 'banking_account')
      entity.type = 2
      db.add(entity, 'banking_account')
    },
};
