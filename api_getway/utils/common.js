const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val))
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
const { BANKING_CODE } = require('../config')

const convertStrToDate = (dateStr) => {
    let dateArr = dateStr.split('-')
    let date = new Date();
    date.setMonth(dateArr[1]);
    date.setFullYear(dateArr[2])
    date.setDate(dateArr[0])
    return date
}

const genagrateAccountNumber = (id, dob) => {
    let _dob = convertStrToDate(dob)
    let now = new Date()
    let dobi64 = _dob.getTime()
    let nowi64 = now.getTime()
    let strNum = id.toString() + dobi64
    return BANKING_CODE + (nowi64 ^ (+strNum))
}

module.exports = {
    required,
    maxLength,
    minLength,
    isNumber,
    validEmail,
    genagrateAccountNumber,
    convertStrToDate
};