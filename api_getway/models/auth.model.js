const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const { PW_SEED } = require('../config')

module.exports = {
  login: async entity => {

    const rows = await userModel.singleByUserName(entity.userName);
    
    if (rows === 0)
      return null;

    //const hash = bcrypt.hashSync(entity.password, PW_SEED);
    //console.log('nguyenvanb1 ', hash)
    const hashPwd = rows[0].password;
    if (bcrypt.compareSync(entity.password, hashPwd)) {
      return rows[0];
    }
    return null;
  },

  relogin: async entity => {
    console.log('relogin ', entity)
    const rows = await userModel.singleByUserId(entity.uId);
    console.log('singleByUserId ', rows)
    if (rows === 0)
      return null;
    return rows[0];
  }
};
