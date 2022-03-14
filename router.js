const express = require('express');
const router = express.Router();
const restrict = require('./middlewares/restrict')
const adm = require('./controllers/admController')

// AUTH ADMIN

// mengakses halaman register
router.get('/register', adm.registerForm)

// memproses registrasi dengan data dinamis
router.post('/register', adm.registerProcess)

// mengakses halaman login
router.get('/login', adm.loginForm)

// memproses login dengan data dinamis
router.post('/login', adm.loginProcess)

// DASHBOARD ADMIN

// mengakses halaman dasbor yang menampilkan biodata user game
router.get('/dashboard', restrict.local, adm.dashboard)

// mengakses halaman tambah data
router.get('/create', adm.bioCreateForm)

// memproses penambahan data
router.post('/create', adm.bioCreateProcess)

// mengakses halaman edit data
router.get('/update/:id', adm.bioUpdateForm)

// memproses perubahan data
router.post('/update/:id', adm.bioUpdateProcess)

// memproses penghapusan data
router.get('/delete/:id', adm.bioDeleteProcess)

// menampilkan riwayat permainan dari user yang dipilih dari dasbor
router.get('/history/:id', adm.historyPage)

// JUST FOR DEMO (POSTMAN)

// menambahkan role
// role 1 untuk admin
// role 2 untuk user
router.post('/role', adm.roleCreate)

module.exports = router;