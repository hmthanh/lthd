const express = require('express')
const moment = require('moment')

const router = express.Router()

const validateData = (data)=> {
  
}

router.post('/employee', async (req, res) => {
  console.log(req.body)
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: [
        {name:'ngan hang pgp', partner_code: '7261'},
        {name:'ngan hang rsa', partner_code: '0923'}
    ]
  })
})

module.exports = router