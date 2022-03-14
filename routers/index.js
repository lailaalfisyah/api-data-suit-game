const express = require('express')
const router = express.Router()
const user = require('./user')
const suit = require('./suit')

// endpoint untuk API yang berkaitan dengan user
// terhubung dengan file user.js di dalam folder yang sama
router.use('/api/user', user)

// endpoint untuk API yang berkaitan dengan game suit
// terhubung dengan file suit.js di dalam folder yang sama
router.use('/api/suit', suit)

module.exports = router