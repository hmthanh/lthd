const pgp = require('./utils/pgp.signature')
const rsa = require('./utils/rsa.signature')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const axios = require('axios')

// import axios require('axios')
const PW_SEED = 'Nhom6'
const partnerCode = 5412


const testApiGetInfoInvalidParnerCode = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      STTTH:'100001',
      Time: `${parseInt(ts / 1000)}`,
      PartnerCode: `${partnerCode}`
  }

  let hashString =  `${data.STTTH}${partnerCode}${data.Time}Nhom6`
  console.log(hashString)

  let hashVal = bcrypt.hashSync(hashString)
  data.Hash = hashVal
  console.log(data)

  const UrlApi = 'http://192.168.43.99:9001/AnotherInternetbanking/InfoAccount'

  axios.post(UrlApi, data)
  .then (respose => {
    console.log(respose.data);
    return respose;
  })
  .catch( error => console.error(error))
}

const testTranfer = async () => {
  const UrlApi = 'http://192.168.31.192:9001/AnotherInternetbanking/TranferInternerAnotherBank'
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      STTTH:'100001',
      PartnerCode:`${partnerCode}`,
      Time: `${parseInt(ts / 1000)}`,
      STTTHAnother: '12321321321321',
      Money: '9928282841',
      PartnerCode: `${partnerCode}`
  }
  let signature  =  await pgp.signUtf8('nhom6') //JSON.stringify(data)
  console.log(signature)
  try {
    await pgp.verifyUtf8(signature)
  } catch (ex) {
    console.log(ex)
  }
  data.Signature = Buffer.from(signature).toString('base64')
  // console.log(data)
  //STTTH+PartnerCode+PartnerCode+Money+SecretKey
  // STTTH +model.STTTHAnother+ model.PartnerCode + model.Time + model.Money
  data.Hash = bcrypt.hashSync(`${data.STTTH}${data.STTTHAnother}${data.PartnerCode}${data.Time}${data.Money}Nhom6`)
  console.log(data)
  axios.post(UrlApi, data)
  .then (respose => {
    console.log(respose.data);
    return respose;
  })
  .catch( error => console.error(error))
}

const { writeFileSync, existsSync, unlinkSync, readFileSync } = require('fs')

const fetchFrom = async (url = '', method = 'POST', data = {}, accessToken = '') => {
  // Default options are marked with *
  const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': accessToken
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};

function main() {
  // testApiGetInfoInvalidParnerCode()
  testTranfer()
  // testApiGetInfoInvalidParnerCode()
  // const UrlApi = 'https://192.168.31.192:5001/WeatherForecast'
  // const UrlApi = 'http://192.168.43.99:9001/WeatherForecast'
  
 
//   fetch('https://192.168.31.192:5001/WeatherForecast', {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//         'Content-Type': 'application/json',
//         // 'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     //body: JSON.stringify(data) // body data type must match "Content-Type" header
// }).then(response => {
// console.log(response)
//    return response.json()
// }) 
// .then(val => {
//   console.log("====================================")
//     console.log(val);
// })
// .catch( error => {
//   console.log("================error====================")
//   console.error(error)
// })


  // fetch('http://192.168.31.192:5000/AnotherInternetbanking/test', {

  // })

  // testApiGetInfoInvalidParnerCode()
  // .then(val => console.log("val: " + val))
  // let signature = Buffer.from('S1Wkdldva7GglywUU4aX4Z+akltrSnFsY2+RpP/fkDhaOkDVwF2Us05yt95wRbo+sbGWEaa8A9ZCcAp+PLI8egrim0ysyIAvlEQgzFnOoyii7LVvqH+9t1endBhLSqMkK2HyvXwq3h631kgcXIKjIP4mVsdAtLA0gj5Kt07IvrkycHlKstdvc0Vsb3XB7ypS6w/yomEs/SVseKs3101hYlsOQFHGGWvhVmIdnYeTZn9cdobKyhJa3agEvV2iBciHY5GtvQyVT2bIWbaIR6o0tlupUiL+DQF2ESvo8574kzfm18wA9l9I3+9XmDm7Mjr9rvwCHdow/xSl7rMH0+ZOTxeS/VVOsf1zxLiJZlLegkL98awbOvCun/xBjFUn91VydY/kruAjb7jRZZWGdv/Lw4EQEdaMTbMzS8IHDv5Yyid1UaP3ZTYu4fsBInN86hW/trreAc5RMSI92ffdt612JMPZOupvxlrZn/KCpANOg9mDHUpB/wpQbJzECbPz+pXqm7cvM8jA4O0hqwYT/m5iN2nVls3hKDZGxVUSMZXV8tdUxUS0DggjWP9+Q4DbNXS7bdh/E6wzodUCL/b/dKI/v98liLH2r6kVGky5LdoaRlglgfZVHBr2uwesZPxp2vpyRP7uVJ2GQsAEtZEcRzjuef5c8fUsGwtQxlaV0laKGQY=')
  // let signature = rsa.sign('nhom6')
  // writeFileSync('signature.txt', signature.toString('base64'))
  // let signature =  Buffer.from('S1Wkdldva7GglywUU4aX4Z+akltrSnFsY2+RpP/fkDhaOkDVwF2Us05yt95wRbo+sbGWEaa8A9ZCcAp+PLI8egrim0ysyIAvlEQgzFnOoyii7LVvqH+9t1endBhLSqMkK2HyvXwq3h631kgcXIKjIP4mVsdAtLA0gj5Kt07IvrkycHlKstdvc0Vsb3XB7ypS6w/yomEs/SVseKs3101hYlsOQFHGGWvhVmIdnYeTZn9cdobKyhJa3agEvV2iBciHY5GtvQyVT2bIWbaIR6o0tlupUiL+DQF2ESvo8574kzfm18wA9l9I3+9XmDm7Mjr9rvwCHdow/xSl7rMH0+ZOTxeS/VVOsf1zxLiJZlLegkL98awbOvCun/xBjFUn91VydY/kruAjb7jRZZWGdv/Lw4EQEdaMTbMzS8IHDv5Yyid1UaP3ZTYu4fsBInN86hW/trreAc5RMSI92ffdt612JMPZOupvxlrZn/KCpANOg9mDHUpB/wpQbJzECbPz+pXqm7cvM8jA4O0hqwYT/m5iN2nVls3hKDZGxVUSMZXV8tdUxUS0DggjWP9+Q4DbNXS7bdh/E6wzodUCL/b/dKI/v98liLH2r6kVGky5LdoaRlglgfZVHBr2uwesZPxp2vpyRP7uVJ2GQsAEtZEcRzjuef5c8fUsGwtQxlaV0laKGQY=', 'base64')

  // let isValid = rsa.verify('nhom6', signature)
  // console.log('isValid = ', isValid)
}

main()