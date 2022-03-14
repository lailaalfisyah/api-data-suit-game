const express = require('express')
const router = express.Router()
const restrict = require('../middlewares/restrict')
const suitController = require('../controllers/suitController')

// fungsi untuk membuat game room
router.post('/room', restrict.jwt, suitController.createRoom)

// fungsi untuk menambahkan riwayat hasil permainan
router.post('/history', restrict.jwt, suitController.addHistory)

module.exports = router