const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const {PW_SEED} = require('../config')
const db = require('../utils/db');
module.exports = {
  login: async entity => {
    const rows = await userModel.singleByUserName(entity.userName);

    if (rows === 0)
      return null;

    const hashPwd = rows[0].password;
    // console.log(hashPwd, entity.password)
    if (bcrypt.compareSync(entity.password, hashPwd)) {
      return rows[0];
    }
    return null;
  },

  relogin: async entity => {
    const rows = await userModel.singleByUserId(entity.uId);
    if (rows === 0)
      return null;
    return rows[0];
  },

  comparePwd: async entity => {
    console.log("entity.uId", entity.uId)
    const rows = await userModel.singleByUserId(entity.uId);
    console.log("row", rows)
    if (rows === 0)
      return null;
    const hashPwd = rows[0].password;
    if (bcrypt.compareSync(entity.oldPwd, hashPwd)) {
      return rows[0];
    }
    return null;
  },

  updatePwd: async entity => {
    const hash = bcrypt.hashSync(entity.newPwd, PW_SEED)
    let _entity = {
      password: hash
    }
    return db.patch(_entity, {id: entity.uId}, 'user_account')
  }
};
