const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const {BANKING_CODE} = require('../config')
const moment = require('moment')


const SQL_SCHEMA = {
  TABLE: {
    TRANSACTION_TRANFER :'transaction_tranfer',
    USER: 'user_account',
    BANKING_INFO: 'banking_info'
  },
  FEILD_NAME: {
    TRANSACTION_TRANFER: {
      TRANSACTION_ID: 'trans_id',
      ACCOUNT_NAME: 'acc_name',
      FROM_ACCOUNT: 'from_account',
      TO_ACCOUNT: 'to_account',
      AMOUNT: 'amount',
      NOTE: 'note',
      TIMESTAMP: 'timestamp',
      SIGNATURE: 'signature',
      TYPE: 'type',
      PARTNER_CODE: 'partner_code',
      STATE:'state',
      SURPLUS :'surplus'
    },
    BANKING_INFO: {
      ID: 'id',
      OWNER: 'owner_id',
      ACCOUNT_NUM:'account_num',
      SURPLUS :'surplus',
      TYPE: 'type',
      IS_CLOSE: 'is_close'
    },
    USER: {
      ID: 'id',
      PHONE: 'phone',
      EMAIL: 'email',
      NAME: 'name',
      DOB: 'date_of_birth',
      USER_NAME: 'user_name',
      PASSWORD:'password',
      ROLE: 'role',
      STATUS: 'status'
    }
  }
}

const convertStrToDate = (dateStr) => {
  let dateArr = dateStr.split('-');
  let date = new Date();
  date.setMonth(dateArr[1]);
  date.setFullYear(dateArr[2]);
  date.setDate(dateArr[0]);
  return date
};

const genagrateAccountNumber = (dob, count) => {
  const timestamp = moment().valueOf(new Date())
  const userTimestamp = moment().valueOf(dob)
  let ret = timestamp & userTimestamp
  ret += count
  if (ret < 0) ret *= -1
  return `${ret}`
}

const strimString = (str) => str.replace(/\s/g, '')

const nonAccentVietnamese = (str) => {
  str = str.toLowerCase();
//     We can also use this instead of from line 11 to line 17
  str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  str = str.replace(/\u0111/g, "d");
  // str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  // str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  // str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  // str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  // str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  // str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  // str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

const msgTemplate = (name, requestName, OTP) => {
  return `Dear ${name}!

  A request requires verification OTP. To complete the sign in, enter the OTP code on the request device.
  
  Request: ${requestName}
  OTP code: ${OTP}
  
  This OTP code expires in 3 minute.

  If you did not this request. your password may be compromised. Visit New Vimo to create a new, strong password for your New Vimo account.
  
  Thanks,
  The New Vimo Team`
};


const msgOTPTemplate = (name, requestName, OTP) =>  `Dear ${name}!

  A request requires verification OTP. To complete tranfer the , enter the OTP code on the request device.
  
  Request: ${requestName}
  OTP code: ${OTP}
  
  This OTP code expires in 3 minute.

  If you did not this request. your password may be compromised. Visit New Vimo to create a new, strong password for your New Vimo account.
  
  Thanks,
  The New Vimo Team`;

const htmlOTPTemplate = (name, requestName, OTP) => `Dear ${name}! <br/></br>

  A request requires verification OTP. To complete the sign in, enter the OTP code on the request device. </br>
  
  Request: ${requestName}</br>
  OTP code:</br> <br> <h2>${OTP}</h2></br>

  This OTP code expires in 3 minute. </br>
  
  If you did not this request. your password may be compromised. Visit New Vimo to create a new, strong password for your New Vimo account.</br>
  
  Thanks,</br>
  The New Vimo Team`


const htmlMsgTemplate = (name, requestName, OTP) => `Dear ${name}! <br/></br>

  A request requires verification OTP. To complete the sign in, enter the OTP code on the request device. </br>
  
  Request: ${requestName}</br>
  OTP code:</br> <br> <h2>${OTP}</h2></br>

  This OTP code expires in 3 minute. </br>
  
  If you did not this request. your password may be compromised. Visit New Vimo to create a new, strong password for your New Vimo account.</br>
  
  Thanks,</br>
  The New Vimo Team`

const msgLogingTemplate = (info) => `Dear ${info.name}!

  Account of you ready to use. Now, you can loging and change password to use
  
  Username: ${info.username}
  Password: ${info.password}
  Account main: ${info.account[0].accountNum}
  Account save: ${info.account[1].accountNum}
  Thanks,
  The New Vimo Team`

const htmlMsgLogingTemplate = (info) => `Dear ${info.name}! <br/></br>

  Account of you ready to use. Now, you can loging and change password to use </br>
  
  Username: <h1>${info.username}</h1></br>
  Password: <h1>${info.password}</h1></br>
  Account main: <h4>${info.account[0].accountNum}</h4></br>
  Account save: <h4>${info.account[1].accountNum}</h4></br>
  Thanks,</br>
  The New Vimo Team`

const msgForgetTemplate = (name, password) => `Dear ${name}!

You have request forget password, please use new password to loging

Password: ${password}

after you login must be change password to use

Thanks,
The New Vimo Team`


const htmlForgetTemplate = (name, password) => `Dear ${name}! <br/>

You have request forget password, please use new password to loging <br/>

Password: <h1>${password}</h1> <br/>

after you login must be change password to use <br/>

Thanks,<br/>
The New Vimo Team`

const validate = (data) => {
  if (!validEmail(data['email'])) return false;
  if (!isNumber(data['phone'])) return false;
  if (!required(data['name'])) return false;
  if (!required(data['date_of_birth'])) return false;
  data['phone'] = '84' + (+data['phone']);
  let DoB = data['date_of_birth'];
  data['password'] = DoB.split('-').join('');

  return true
};

const msgLogingAdminTemplate = (info) => `Dear ${info.name}!

  Account of you ready to use. Now, you can loging and change password to use
  
  Username: ${info.username}
  Password: ${info.password}
  Thanks,
  The New Vimo Team`

const htmlMsgLogingAdminTemplate = (info) => `Dear ${info.name}! <br/></br>

  Account of you ready to use. Now, you can loging and change password to use </br>
  
  Username: <h1>${info.username}</h1></br>
  Password: <h1>${info.password}</h1></br>
  Thanks,</br>
  The New Vimo Team`

const convertObjectToArray = (object) => Object.keys(object).map(i => object[i]);

module.exports = {
  strimString,
  required,
  maxLength,
  minLength,
  isNumber,
  validEmail,
  genagrateAccountNumber,
  convertStrToDate,
  nonAccentVietnamese,
  msgTemplate,
  htmlMsgTemplate,
  validate,
  msgLogingTemplate,
  htmlMsgLogingTemplate,
  msgForgetTemplate,
  htmlForgetTemplate,
  convertObjectToArray,
  SQL_SCHEMA,
  msgOTPTemplate,
  htmlOTPTemplate,
  msgLogingAdminTemplate,
  htmlMsgLogingAdminTemplate
};