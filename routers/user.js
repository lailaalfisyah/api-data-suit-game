const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// fungsi registrasi
router.post('/register', userController.register)

// fungsi login
router.post('/login', userController.login)

module.exports = router