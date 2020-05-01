const db = require('./utils/db')
const bcrypt = require('bcryptjs')
const {PW_SEED} = require('./config')
const moment = require('moment')

let createAdmin = async () => {
  const salt = bcrypt.genSaltSync(PW_SEED)
  const hashPwd = bcrypt.hashSync('123456', salt)
  console.log(`===================new section=====================`)
  console.log('create 3 account admin')
  let ts = moment().valueOf(new Date())
  let curr = ts - (1000 * 60 * 60  * 24 * 365 * 20);
  // create 3 account admin
  for (let i = 0; i < 3; i++) {

    curr = curr - Math.floor(Math.random() * 1000000000)
    let entity = {
      phone: '0909000213',
      email: 'admin@email.com',
      name: 'admin',
      date_of_birth: new Date(curr),
      account_num: 'not have!',
      user_name: 'superadmin',
      password: hashPwd,
      role: 1,
      status: 1
    }

    console.log(`create admin account with info ${entity}`)
    let res = await db.add({...entity}, 'user_info')
    entity = {...entity, user_name: `${entity.user_name}${i}`}
    console.log(`respone: ${res}`)
  }
  
}


let createEmployee = async () => {
  console.log('====================new section========================')
  console.log('create 10 account employee')
  const salt = bcrypt.genSaltSync(PW_SEED)
  const hashPwd = bcrypt.hashSync('123456', salt)
  
  let ts = moment().valueOf(new Date())
  let curr = ts - (1000 * 60 * 60  * 24 * 365 * 20);
  for (let i = 0; i < 10; i++) {
    const tmp = `employee${Math.floor(Math.random() * 90000) % 100}`
    curr = curr - Math.floor(Math.random() * 1000000000)
    const entity = {
      phone: `0909${Math.floor(Math.random() * 900000) + 100000}`,
      email: `${tmp}@email.com`,
      name: `${tmp}`,
      account_num: 'not have!',
      user_name: `${tmp}`,
      date_of_birth: new Date(curr),
      password: hashPwd,
      role: 2,
      status: 1
    }
    console.log('============================================')
    console.log(`create employee account with info ${entity}`)
    let res = await db.add(entity, 'user_info')
    console.log(res)
  }
}


createAdmin()
createEmployee();

