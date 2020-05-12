const rsa = require('./utils/rsa.signature')
const pgp = require('./utils/pgp.signature')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const PW_SEED = 'Nhom6'
const partnerCode = 5412

// let data = 'some data sign'
// let signature = rsa.sign(data)
// console.log(signature)

// // data = JSON.stringify({"accountNum":73983492348,"amount":100000,"note":"ghi chú","ts":1583019633869})

// let isTrue = rsa.verify(data, signature)
// console.log(isTrue)

// const pgp =require('./utils/pgp.signature')
// let data = 'some data sign'
// pgp.sign(data).then(txt => {
//   console.log(txt)
//   pgp.verify(txt).then(isValid => console.log(isValid))
// })


// https://bethu4.azurewebsites.net/AnotherInternetbanking/InfoAccount


// const testApiGetInfoInvalidParnerCode = () => {
//   let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
//   let data = {
//       STTTH:'100001',
//       Time: `${ts / 1000}`,
//       PartnerCode: `${partnerCode}`
//   }

//   let hashString =  `${data.STTTH}${data.Time}${data.PartnerCode}`
//   console.log(hashString)

//   let hashVal = bcrypt.hashSync(hashString, 123214)
//   data.Hash = hashVal
//   // const UrlApi = '192.168.43.99:3100/AnotherInternetbanking/InfoAccount'
//   const UrlApi = 'https://bethu4.azurewebsites.net/AnotherInternetbanking/InfoAccount'
//   return axios({
//     method: 'POST',
//     headers: { 
//       'content-type': 'application/problem+json; charset=utf-8',
//       'Transfer-Encoding': 'chunked',
//       'Server':'Kestrel'
//     },
//     url: UrlApi,

//     data: data
//   })
//   .then (respose => { console.log(respose);respose.data })
//   .catch( error => console.log(error))
// }

const testApiGetInfoInvalidParnerCode = () => {
  let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
  let data = {
      STTTH:'100001',
      Time: `${ts / 1000}`,
      PartnerCode: `${partnerCode}`
  }

  let hashString =  `${data.STTTH}${data.Time}${data.PartnerCode}`
  console.log(hashString)

  let hashVal = bcrypt.hashSync(hashString, 123214)
  data.Hash = hashVal
  const UrlApi = 'http://192.168.31.192:3100/AnotherInternetbanking/testacc'
  
  // const UrlApi = 'http://192.168.31.192:3100/AnotherInternetbanking/InfoAccount'

  return axios({
    method: 'POST',
    headers: { 
      'content-type': 'application/problem+json; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Server':'Kestrel'
    },
    url: UrlApi,

    data: data
  })
  .then (respose => { 
    console.log(respose);
    return respose;
  })
  .catch( error => console.log(error))
}

const { writeFileSync, existsSync, unlinkSync, readFileSync } = require('fs')

function main() {
  testApiGetInfoInvalidParnerCode()
  .then(val => console.log(val))
  // let signature = Buffer.from('S1Wkdldva7GglywUU4aX4Z+akltrSnFsY2+RpP/fkDhaOkDVwF2Us05yt95wRbo+sbGWEaa8A9ZCcAp+PLI8egrim0ysyIAvlEQgzFnOoyii7LVvqH+9t1endBhLSqMkK2HyvXwq3h631kgcXIKjIP4mVsdAtLA0gj5Kt07IvrkycHlKstdvc0Vsb3XB7ypS6w/yomEs/SVseKs3101hYlsOQFHGGWvhVmIdnYeTZn9cdobKyhJa3agEvV2iBciHY5GtvQyVT2bIWbaIR6o0tlupUiL+DQF2ESvo8574kzfm18wA9l9I3+9XmDm7Mjr9rvwCHdow/xSl7rMH0+ZOTxeS/VVOsf1zxLiJZlLegkL98awbOvCun/xBjFUn91VydY/kruAjb7jRZZWGdv/Lw4EQEdaMTbMzS8IHDv5Yyid1UaP3ZTYu4fsBInN86hW/trreAc5RMSI92ffdt612JMPZOupvxlrZn/KCpANOg9mDHUpB/wpQbJzECbPz+pXqm7cvM8jA4O0hqwYT/m5iN2nVls3hKDZGxVUSMZXV8tdUxUS0DggjWP9+Q4DbNXS7bdh/E6wzodUCL/b/dKI/v98liLH2r6kVGky5LdoaRlglgfZVHBr2uwesZPxp2vpyRP7uVJ2GQsAEtZEcRzjuef5c8fUsGwtQxlaV0laKGQY=')
  // let signature = rsa.sign('nhom6')
  // writeFileSync('signature.txt', signature.toString('base64'))
  // let signature =  Buffer.from('S1Wkdldva7GglywUU4aX4Z+akltrSnFsY2+RpP/fkDhaOkDVwF2Us05yt95wRbo+sbGWEaa8A9ZCcAp+PLI8egrim0ysyIAvlEQgzFnOoyii7LVvqH+9t1endBhLSqMkK2HyvXwq3h631kgcXIKjIP4mVsdAtLA0gj5Kt07IvrkycHlKstdvc0Vsb3XB7ypS6w/yomEs/SVseKs3101hYlsOQFHGGWvhVmIdnYeTZn9cdobKyhJa3agEvV2iBciHY5GtvQyVT2bIWbaIR6o0tlupUiL+DQF2ESvo8574kzfm18wA9l9I3+9XmDm7Mjr9rvwCHdow/xSl7rMH0+ZOTxeS/VVOsf1zxLiJZlLegkL98awbOvCun/xBjFUn91VydY/kruAjb7jRZZWGdv/Lw4EQEdaMTbMzS8IHDv5Yyid1UaP3ZTYu4fsBInN86hW/trreAc5RMSI92ffdt612JMPZOupvxlrZn/KCpANOg9mDHUpB/wpQbJzECbPz+pXqm7cvM8jA4O0hqwYT/m5iN2nVls3hKDZGxVUSMZXV8tdUxUS0DggjWP9+Q4DbNXS7bdh/E6wzodUCL/b/dKI/v98liLH2r6kVGky5LdoaRlglgfZVHBr2uwesZPxp2vpyRP7uVJ2GQsAEtZEcRzjuef5c8fUsGwtQxlaV0laKGQY=', 'base64')

  // let isValid = rsa.verify('nhom6', signature)
  // console.log('isValid = ', isValid)
}

main()


// const request = require('request')

// let ts = moment().valueOf(new Date()) // get current milliseconds since the Unix Epoch
// let data = {
//     STTTH:'100001',
//     Time: `${ts / 1000}`,
//     PartnerCode: `${partnerCode}`
// }

// let hashString =  `${data.STTTH}${data.Time}${data.PartnerCode}`
// console.log(hashString)

// let hashVal = bcrypt.hashSync(hashString, 123214)
// data.Hash = hashVal

// // request.post('http://service.com/upload').form(data)


// // request.post({url:'https://bethu4.azurewebsites.net/AnotherInternetbanking/InfoAccount', formData: data}, function optionalCallback(err, httpResponse, body) {
// //   if (err) {
// //     return console.error('upload failed:', err);
// //   }

// //   console.log('httpResponse ', httpResponse)
// //   console.log('Upload successful!  Server responded with:', body);
// // });


// var options = {
//   url: 'https://bethu4.azurewebsites.net/AnotherInternetbanking/test',
//   method : 'POST',
//   json : true,
//   headers: {}
// };

// function callback(error, response, body) {
//   // console.log(response)

//   // console.log(response.statusCode)
//   if (!error && response.statusCode == 200) {
//     // var info = JSON.parse(body);
//     console.log(body)
//   }
//   else {
//     console.log(error)
//   }
// }

// request(options, callback);