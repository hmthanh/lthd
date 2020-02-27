// const crypto = require('crypto')

// const NodeRSA = require('node-rsa')


// const myPrivateKey = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----' +
//                                   'MIICWQIBAAKBgHLBhWI3qNtooLufc/MiuaJ/FxLBZ1FAmSuu6/cd4fN2+35BXTn4' +
//                                   'fQ2dsSXciuPih0lwJ1ko87W0WpQ/SESLoblKsnNyd9YmvhESi1wqFre5tQM7Stna' +
//                                   'auHkumrbFM/ft345wt0U549O+teTJXJ39zfazpoRLsAUS8/DnQ8hfBIPAgMBAAEC' +
//                                   'gYAZUkRZWMjEqUCWRefy5V2q0npH5C8lCakCr5VXsNtTupRh1pB4ozEM2Rfmr9Rh' +
//                                   '1nFdrgawsM2d8Y7vGUub/GeRyv8TnC2kie+pZqHEpNSkaWeydj5N5o5o5nvU+uD3' +
//                                   'qN7jXMg4Ucc9d8qNJwOHojy7y8y8EbELWCGlZ3SH1qReIQJBANKRqVNoG9f0+Fp4' +
//                                   'OoCbZ4bfMuJeUdeZhYSTSDHMXQsnA9jkbVXlHxSwo9l3fWIFWkzGsTurfIxP5PKr' +
//                                   '7GfvIbECQQCLg9NtsVdtbO4M1Sq3G5cLVp8nAZhV37En+A4zs7fJGdj4YHGodsbY' +
//                                   'zN4IqENoL3h2Y2ZbYRQ+cmR8UuKetZ+/Aj8mqJdtuK9j9pWiBnC3K9DV8iRlauub' +
//                                   'qZPZwzB99AchBQivyUBJhMcwBT4PruBWHqV1cwUW72TuXbyq0OWWL1ECQDe+opov' +
//                                   'w+kbHzrNadXkFkQXhlwFjSKy0IxR1wrdgk++Hi2QC5nua6Fwqj73TIeygAV9zgYx' +
//                                   'Ee+psXDjhV044O0CQDidvMJ7772PV0/pT2vjRm8vibncXRxQcI0BO4tWG9+rJk0S' +
//                                   'fQDd6sqQ+XxDqXVn5cm1EyPUzjaA8VD0djLwEFQ=' +
//                                   '-----END RSA PRIVATE KEY-----')

// let data = myPrivateKey.sign("12314421421")

// console.log(new String(data))

// myPrivateKey.verify()

// const crypto = require('crypto')
// const fs = require('fs')
// const path = require('path')
// const absolutePath = path.resolve('../../')
// const publicKey = fs.readFileSync(absolutePath, 'utf8')

// // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
// //   modulusLength: 2048,
// // });

// let keyObj = crypto.createPrivateKey(Buffer.from(privateKey))
// console.log(keyObj)

// let data = crypto.sign('rsa', Buffer.from('some data to sign','utf-8'), keyObj)

// console.log(data)
// console.log(privateKey.export({type: 'pkcs1', format: 'pem'}))

// const sign = crypto.createSign('SHA256');
// sign.update('some data to sign');
// sign.end();
// const signature = sign.sign(privateKey);

// const verify = crypto.createVerify('SHA256');
// verify.update('some data to sign');
// verify.end();
// console.log(verify.verify(publicKey, signature));

// const { writeFileSync } = require('fs')
// const { generateKeyPairSync } = require('crypto')

// function generateKeys() {
//   const { privateKey, publicKey } = generateKeyPairSync('rsa', {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//       type: 'pkcs1',
//       format: 'pem',
//     },
//     privateKeyEncoding: {
      // type: 'pkcs1',
      // format: 'pem',
      // cipher: 'aes-256-cbc',
      // passphrase: '',
//     },
//   })

//   writeFileSync('private.pem', privateKey)
//   writeFileSync('public.pem', publicKey)
// }

// generateKeys()

const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const absolutePath = path.resolve('private.pem')
const privateKey = fs.readFileSync(absolutePath, 'utf8')
const buffer = Buffer.from('some data sign', 'utf8')

const option = {
  key: privateKey, 
  format: 'pem', 
  type: 'pkcs1',
  passphrase: ''
}
let keyObj = crypto.createPrivateKey(option)
console.log(keyObj.export({      
  type: 'pkcs1',
  format: 'pem',
  cipher: 'aes-256-cbc',
  passphrase: ''}))