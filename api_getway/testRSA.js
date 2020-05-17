// const rsa = require('./utils/rsa.signature')
const { hash, verifyHash, verify, sign } = require('./utils/rsa.signature')
const { SECRET_RSA, RSA_URL_INFO, RSA_PARTNERCODE, RSA_URL_TRANFER } = require('./config')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const axios = require('axios')


// const getInfoParnerBankRSA = async (accNum) => {
//   const data = {
//     userName: '', // 1 trong 2 field userName hoặc accountNumber
//     accountNumber: accNum, // 1 trong 2 field userName hoặc accountNumber
//     ts: Date.now(),
//     recvWindow: 5000,
//   }
//   const body = {
//     data: data, // Request data
//     hash: hash(JSON.stringify(data), SECRET_RSA), // Chuỗi hash lại của request data (đã chuyển thành JSON string) bằng secret key của quý đối tác, 
//     partnerId: `${RSA_PARTNERCODE}` // Partner Id của đối tác, được cung cấp khi 2 bên liên kết với nhau
//   }
//   // console.log('getInfoParnerBankRSA', body)

//   const UrlApi = RSA_URL_INFO

//   // console.log(UrlApi)

//   return axios.post(UrlApi, body)
//   .then (respose => {
//     console.log(respose.data);
//     return respose;
//   })
//   .catch( error => console.error(error))
// }

const tranferRSA = async transaction => {
  const data = {
    from: `${transaction.acc_name}`,
    fromAccountNumber: `${transaction.from_account}`,
    toAccountNumber: `${transaction.to_account}`,
    amount: transaction.amount,
    description: 'Chuyển liên ngân hàng',
    ts: Date.now(),
    recvWindow: 5000,
}
  const UrlApi = RSA_URL_TRANFER
  const body = {
    data: data, // Request data
    // hash: hash(JSON.stringify(data), SECRET_RSA), // Chuỗi hash lại của request data (đã chuyển thành JSON string) bằng secret key của quý đối tác, 
    partnerId: `${RSA_PARTNERCODE}` // Partner Id của đối tác, được cung cấp khi 2 bên liên kết với nhau
  }

  let signature  =  await sign(JSON.stringify(data)) //JSON.stringify(data)
  body.sign = Buffer.from(signature).toString('base64')
  let hashval = await hash(JSON.stringify(data), SECRET_RSA )
  body.hash = hashval
  // console.log(data)
  return axios.post(UrlApi, body)
}

const main = () => {
  // getInfoParnerBankRSA('1005398')
  // .then(acc => {
  //   console.log(acc)
  // })

  tranferRSA({
    acc_name: 'Tâm',
    from_account: '07251743899648' ,
    to_account: '1005398',
    amount: 1000000
  }).then( res => {
    console.log(res)
  }).catch (res => {
    console.log(res)
  })
}

main()