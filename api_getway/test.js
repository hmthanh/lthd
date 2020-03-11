const rsa = require('./utils/rsa.signature')

let data = 'some data sign'
let signature = rsa.sign(data)
console.log(signature)

// data = JSON.stringify({"accountNum":73983492348,"amount":100000,"note":"ghi chú","ts":1583019633869})

let isTrue = rsa.verify(data, signature)
console.log(isTrue)

// const pgp =require('./utils/pgp.signature')
// let data = 'some data sign'
// pgp.sign(data).then(txt => {
//   console.log(txt)
//   pgp.verify(txt).then(isValid => console.log(isValid))
// })
