const express = require('express')
const rndToken = require('rand-token')
const common = require('../utils/common')
const accountModel = require('../models/account.model')
const userAccount = require('../models/userAccount.model')
const bankingInfoModel = require('../models/bankingInfo.model')
const receiverModel = require('../models/receiverInfo.model')
const userModel = require('../models/user.model')
const {
  SECRET_TOKEN, OTP, PGP_URL_INFO, PGP_PARTNERCODE, RSA_PARTNERCODE,
  RSA_URL_INFO, SECRET_RSA, LENGTH_REFREST_TOKEN
} = require('../config')

const bcrypt = require('bcryptjs')

const moment = require('moment')

// const {SECRET_RSA} = require('../config')
const mailController = require('../mailer/mail.controller')
const {hash} = require('../utils/rsa.signature')
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
  console.log(count)
  count = count[0].num + 1
  console.log(`${uname}${count}`)
  console.log('password: ', pass)
  if (isValid) {
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
    restItem.account = [{accountNum: account_num1, type: 1}, {accountNum: account_num2, type: 2}]
    msg = 'successfully'
    errorCode = 0

    let msgText = common.msgLogingTemplate({...restItem, password: pass});
    // console.log(sender.email, sender);
    let htmlmsg = common.htmlMsgLogingTemplate({...restItem, password: pass});
    mailController.sentMail(data.email, '[New Vimo][important !!!] Account Vimo', msgText, htmlmsg);
    const rfToken = rndToken.generate(LENGTH_REFREST_TOKEN);
    refeshTokenModel.add({user_id: results.insertId, refresh_token: rfToken});
  } else {
    msg = 'invalid params'
    errorCode = -100
  }
  res.status(200).json({
    restItem,
    msg
  })
})

router.post('/payment', async (req, res) => {
  // console.log(req.body);
  const user = await userModel.singleByUserId(req.body.id);
  const userInfo = user[0];
  // console.log("date_of_birth", userInfo);
  const dob = new Date(userInfo.date_of_birth)
  let count = await userAccount.countUserName(userInfo.user_name)
  count = count[0].num + 1
  let accountNum = await common.genagrateAccountNumber(dob, count)
  // console.log('accountNum' , accountNum)
  let entity = {
    owner_id: req.body.id,
    account_num: accountNum,
    surplus: 0,
    type: req.body.type,
    is_close: 0
  }

  const update = await bankingInfoModel.add(entity);

  await res.status(200).json({
    errorCode: 0,
    entity,
    msg: 'successfully'
  })
})


router.post('/closed', async (req, res) => {
  console.log(req.body);
  let account = await bankingInfoModel.getInfoAccountByAccNum(req.body.closerId)
  if (!account || account.length === 0) {
    res.json({
      errorCode: -100,
      msg: 'not found closerId'
    })
    return
  }
  account = account[0]
  let tagetAcc = await bankingInfoModel.getInfoAccountByAccNum(req.body.receiveId)
  if (!tagetAcc || tagetAcc.length === 0) {
    res.json({
      errorCode: -130,
      msg: 'not found receiveId'
    })
    return
  }
  tagetAcc = tagetAcc[0]
  let countAcc = await bankingInfoModel.countAccountAcctivate(req.body.uid)
  count = countAcc[0].num
  let isValid = countAcc > 1 ? true : false
  if (isValid) {
    res.json({
      errorCode: -200,
      msg: "không đóng được tài khoản cuối cùng"
    })
    return
  }
  const entity = {
    is_close: 1,
    surplus: 0
  }
  tagetAcc.surplus = parseInt(tagetAcc.surplus) + parseInt(account.surplus)
  let r1 =  await bankingInfoModel.update(entity, {account_num: req.body.closerId})
  // console.log(r1)
  let r2 = await bankingInfoModel.update(tagetAcc, {account_num: req.body.receiveId})
  // console.log(r2)
  res.status(200).json({
    errorCode: 0,
    msg: 'successfully'
  })
})

router.post('/id', async (req, res) => {
  let account = await bankingInfoModel.getInfoAccount(req.body.id);
  let ret = {
    errorCode: -201,
    msg: 'invalid parameters',
  };
  if (account && account.length != 0) {
    ret = {
      errorCode: 0,
      msg: 'successfully',
      account: account
    }
  }
  await res.status(200).json(ret)
});


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
      .then(respose => {
        console.log(respose.data);
        return respose;
      })
      .catch(error => console.error(error))
}

const getInfoParnerBankPGP = async (accNum) => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
    STTTH: `${accNum}`,
    Time: `${parseInt(ts / 1000)}`,
    PartnerCode: `0725`
  }

  let hashString = `${data.STTTH}${data.PartnerCode}${data.Time}Nhom6`
  // console.log(hashString)

  let hashVal = bcrypt.hashSync(hashString)
  data.Hash = hashVal
  console.log(data)

  const UrlApi = PGP_URL_INFO

  return await axios.post(UrlApi, data)
}

router.post('/acc', async (req, res) => {
  console.log(req.body)
  let item = {}
  let account = null;
  if (req.body.partner && req.body.partner !== '0' && req.body.partner !== 0) {
    let info = {}
    if (req.body.partner === '0923') {
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
    } else {
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
    // console.log('account getInfoByAccount', account )
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

router.post('/accpayment', async (req, res) => {
  let account = await bankingInfoModel.getInfoAccountPayment(req.body.id);
  let ret = {
    errorCode: -201,
    msg: 'invalid parameters',
  };
  if (account && account.length != 0) {
    ret = {
      errorCode: 0,
      msg: 'successfully',
      account: account
    }
  }
  await res.status(200).json(ret)
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