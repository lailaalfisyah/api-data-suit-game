const passport = require('passport')
const { Role, Biodata, UserGameHistory } = require('../models')

module.exports = {

  // AUTH

  registerForm: (req, res) => {
    res.render('admin/form-register', {
      title: 'Register Admin'
    })
  },

  registerProcess: (req, res) => {
    Biodata.register(req.body, req.body.roleID)
      .then(() => res.redirect('/login'))
      .catch(err => next(err))
  },

  loginForm: (req, res) => {
    res.render('admin/form-login', {
        title: 'Login Admin'
    })
  },

  loginProcess: passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureMessage: true
  }),

  // DASHBOARD

  dashboard: (req, res) => {
    Biodata.findAll({
      where: { roleID: 2 }
    })
      .then(usergames => {
        res.render('admin/dashboard', {
          title: 'Dashboard Admin',
          usergames,
          admin: req.user.dataValues
        })
      })
  },

  bioCreateForm: (req, res) => {
    res.render('admin/tambah-data', {
        title: 'Tambah Data'
    })
  },

  bioCreateProcess: (req, res) => {
    Biodata.register(req.body)
      .then(() => res.redirect('/dashboard'))
  },

  bioUpdateForm: (req, res) => {
    Biodata.findOne({
      where: { id: req.params.id }
    })
    .then(usergame => {
      res.render('admin/edit-data', {
        title: 'Edit Data',
        usergame
      })
    })
  },

  bioUpdateProcess: (req, res) => {
    Biodata.update({
      fullName: req.body.fullName,
      username: req.body.username,
      gender: req.body.gender,
      email: req.body.email
    }, {
      where: { id: req.params.id }
    })
    .then(() => res.redirect('/dashboard'))
  },

  bioDeleteProcess: (req, res) => {
    Biodata.destroy({
        where: { id: req.params.id }
    })
    .then(() => res.redirect('/dashboard'))
  },

  historyPage: (req, res) => {
    UserGameHistory.findAll({
      where: { bioID: req.params.id }
    })
    .then(history => {
      res.render('admin/game-history', {
        title: 'Game History',
        history
      })
    })
  },

  // JUST FOR DEMO (POSTMAN)

  roleCreate: (req, res) => {
    Role.create({
      desc: req.body.desc
    })
      .then(role => res.status(200).json(role))
  }
}