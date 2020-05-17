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
  testApiGetInfoInvalidParnerCode()
  // testTranfer()
}

main()