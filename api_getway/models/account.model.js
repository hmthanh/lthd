const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const { convertStrToDate } = require('../utils/common');
module.exports = {
  add: entity => {
    entity['date_of_birth'] = convertStrToDate(entity['date_of_birth'])
    return db.add(entity, 'user_info')
  },

//   singleByUserName: userName => db.load(`select * from users where f_UserName = '${userName}'`),
};
