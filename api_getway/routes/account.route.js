const express = require('express')
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')
const authModel = require('../models/auth.model')
const common = require('../utils/common')
const accountModel = require('../models/account.model')
const userAccount = require('../models/userAccount.model')
const bankingInfoModel = require('../models/bankingInfo.model')
const receiverModel = require('../models/receiverInfo.model')
const userModel = require('../models/user.model')
const {SECRET_TOKEN, OTP, PGP_URL_INFO, PGP_PARTNERCODE, RSA_PARTNERCODE,
  RSA_URL_INFO, SECRET_RSA} = require('../config')

const bcrypt = require('bcryptjs')

const moment = require('moment')

  // const {SECRET_RSA} = require('../config')
const mailController = require('../mailer/mail.controller')
const { hash } = require('../utils/rsa.signature')
const axios = require('axios')

const router = express.Router()

function validateReceiverData(data) {
  if (!common.isNumber(data.phone)) return false
  if (!common.validEmail(data.email)) return false
  if (!data.name) return false
  try {
    new Date(data.date_of_birth)
  } catch (error) {
    return false
  }
  return true
}

router.post('/', async (req, res) => {
  let restItem = {}
  let msg = ''
  let errorCode = 0
  const data = req.body
  const isValid = validateReceiverData(data)
  const pass = OTP.generate(SECRET_TOKEN)
  const dob = new Date(data.date_of_birth)
  const uname = common.nonAccentVietnamese(common.strimString(data.name))
  let count = await userAccount.countUserName(uname)
  count = count[0].num + 1
  console.log('password: ', pass)
  if(isValid) {
    let entity = {
      name: data.name,
      user_name: `${uname}${count}`,
      email: data.email,
      password: pass,
      date_of_birth: dob,
      phone: parseInt(`84${parseInt(data.phone)}`),
      role: data.role || 3,
      status: data.role || 0
    }
    // console.log(entity)
    restItem = {
      name: data.name,
      username: `${uname}${count}`,
      email: data.email,
      dateOfBirth: dob,
      phone: parseInt(`84${parseInt(data.phone)}`)
    }
    let results = await userAccount.add(entity)
    let account_num1 = common.genagrateAccountNumber(dob, count)
    entity = {
      owner_id: results.insertId,
      account_num: account_num1,
      surplus: 0,
      type: 1
    }
    await bankingInfoModel.add(entity)
    account_num2 = common.genagrateAccountNumber(dob, count + 1)
    entity.account_num = account_num2
    entity.type = 2
    
    await bankingInfoModel.add(entity)
    restItem.account = [ {accountNum: account_num1, type: 1},{accountNum: account_num2, type: 2}]
    msg = 'successfully'
    errorCode = 0

    let msgText = common.msgLogingTemplate({...restItem, password: pass});
    // console.log(sender.email, sender);
    let htmlmsg = common.htmlMsgLogingTemplate({...restItem, password: pass});
    mailController.sentMail(data.email, '[New Vimo][important !!!] Account Vimo', msgText, htmlmsg);

  } else {
    msg = 'invalid params'
    errorCode = -100
  }
  res.status(200).json({
    restItem,
    msg
  })
})

/**
  let data = {...req.body};
  let DoB = data['date_of_birth'];
  const isValid = common.validate(data);
  let ret, errorCode, item, msg = null;
  if (isValid) {
    const pass = OTP.generate(SECRET_TOKEN);
    data.password = pass;
    let results = await accountModel.add(data);
    let insertId = results.insertId;
    let name = common.nonAccentVietnamese(data.name);
    let userName = name.split(' ').join('') + insertId;
    let accountNum = common.genagrateAccountNumber(insertId, DoB);
    await accountModel.updateAccount(insertId, {user_name: userName, account_num: accountNum});
    console.log(`userName: ${userName} default password: ${pass}`);
    let msg = common.msgLogingTemplate(data['name'], userName, pass);
    // console.log(sender.email, sender);
    const htmlmsg = common.htmlMsgLogingTemplate(data['name'], userName, pass);
    mailController.sentMail(data['email'], '[New Vimo][important !!!] Account Vimo', msg, htmlmsg);
    accountModel.setDefaultAccount(insertId);


*/

router.post('/id', async (req, res) => {
  let account = await bankingInfoModel.getInfoAccount(req.body.id);
  let ret = {
    errorCode: -201,
    msg: 'invalid parameters',
  };
  if (account && account.length != 0) {
    for (let i = 0; i < account.length; i++) {
      const item = account[i];
      item.account_num = item.account_num  + item.type;
    }
    ret = {
      errorCode: 0,
      msg: 'successfully',
      account: account
    }
  }
  await res.status(200).json(ret)
});

// const getInfoParnerBankPGP = async (accNum) => {
//   let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
//   let data = {
//       STTTH:`${accNum}`,
//       Time: `${parseInt(ts / 1000)}`,
//       PartnerCode: `${PGP_PARTNERCODE}`
//   }

//   let hashString =  `${data.STTTH}${data.PartnerCode}${data.Time}Nhom6`
//   // console.log(hashString)

//   let hashVal = bcrypt.hashSync(hashString)
//   data.Hash = hashVal
//   console.log(data)

//   const UrlApi = PGP_URL_INFO

//   return axios.post(UrlApi, data)
//   .then (respose => {
//     console.log(respose.data);
//     return respose;
//   })
//   .catch( error => console.error(error))
// }


const getInfoParnerBankRSA = async (accNum) => {
  const data = {
    userName: '', // 1 trong 2 field userName hoặc accountNumber
    accountNumber: accNum, // 1 trong 2 field userName hoặc accountNumber
    ts: Date.now(),
    recvWindow: 5000,
  }
  const body = {
    data: data, // Request data
    hash: hash(JSON.stringify(data), SECRET_RSA), // Chuỗi hash lại của request data (đã chuyển thành JSON string) bằng secret key của quý đối tác, 
    partnerId: `${RSA_PARTNERCODE}` // Partner Id của đối tác, được cung cấp khi 2 bên liên kết với nhau
  }
  // console.log('getInfoParnerBankRSA', body)

  const UrlApi = RSA_URL_INFO

  // console.log(UrlApi)

  return axios.post(UrlApi, body)
  .then (respose => {
    console.log(respose.data);
    return respose;
  })
  .catch( error => console.error(error))
}

const getInfoParnerBankPGP = async (accNum) => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      STTTH:`${accNum}`,
      Time: `${parseInt(ts / 1000)}`,
      PartnerCode: `0725`
  }

  let hashString =  `${data.STTTH}${data.PartnerCode}${data.Time}Nhom6`
  // console.log(hashString)

  let hashVal = bcrypt.hashSync(hashString)
  data.Hash = hashVal
  console.log(data)

  const UrlApi = PGP_URL_INFO

  return await axios.post(UrlApi, data)
  // .then (respose => {
  //   console.log(respose.data);
  //   return respose.data;
  // })
  // .catch( error => console.error(error))
}

router.post('/acc', async (req, res) => {

  console.log(req.body)
  let item = {}
  if(req.body.partner && req.body.partner !== '0') {
    let info = {}
    if (req.body.partner === '0923' ) {
      info = await getInfoParnerBankRSA(req.body.query)
      info = info.data
      // console.log('===========================', info)
      account = info.data
      info = {...info.data}
      /*
      userName: String,
        name: String,
        phone: String,
        accountNumber: String,
      */

      item = {
        account_num: info.accountNumber,
        name: info.name,
        email: info.phone,
      }
    }
    else {
      info = await getInfoParnerBankPGP(req.body.query)
      
      account = info.data
      info = {...info.data}
      item = {
        account_num: info.accountNumber,
        name: info.account.fullName,
        email: info.account.email,
      }
    }   
  } else {
    account = await accountModel.getInfoByAccount(req.body.query)
    if (account.length === 0) {
      // try account
      let q = req.body.query.slice(0, -1)
      account = await accountModel.getInfoByAccount(q)
    }
    item = account[0]
  }
  let ret = {
    errorCode: -201,
    msg: 'invalid parameters',
  };
  if (account && account.length !== 0) {
    // item = account[0];
    ret = {
      errorCode: 0,
      msg: 'successfully',
      account: item
    }
  }
  await res.status(200).json(ret)
});

// create receiver_info
router.post('/ref/account', async (req, res) => {
  const isValid = true;//validateReceiverData(req.body);
  let errorCode = 400;
  let ret = {
    msg: 'invalid parameters',
  };
  if (isValid) {
    let user = userModel.singleByAccountNum(req.body.accountNum);
    let entity = {
      owner_id: req.body.id,
      account_id: user.id,
      alias_name: req.body.aliasName
    };
    let newReceiver = await receiverModel.add(entity);
    errorCode = 200;
    ret = {
      msg: 'successfully',
      newReceiver: entity
    }
  }
  await res.status(errorCode).json(ret)
});
// get all receiver_info by uid
router.post('/ref/account/id', async (req, res) => {
  console.log(req.body);
  let receivers = receiverModel.get(req.body.id);
  let errorCode = 200;
  let ret = null;
  if (receivers) {
    ret = {
      msg: 'successfully',
      receivers
    }

  } else {
    ret = {
      msg: 'not found uid',
      receivers
    }
  }
  res.status(errorCode).json(ret)
});

// get account Num
router.post('/:id', async (req, res) => {
  console.log(req.params.id);

  let user = await userModel.singleByUserId(req.params.id);
  // console.log('get account Num', user)
  let errorCode = 200;
  let ret = {
    errorCode: 0,
    msg: 'successfully',
    item: user[0]
  };

  res.status(errorCode).json(ret)
});

module.exports = router;