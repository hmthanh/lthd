const express = require('express')
const moment = require('moment')

const router = express.Router()



router.post('/', async (req, res) => {
  res.status(200).json({
    msg: 'successfully',
    errorCode: 0,
    item: [
        {name:'ngan hang a', partner_code: '0923'},
        {name:'ngan hang b', partner_code: '7261'}
    ]
  })
})

module.exports = router