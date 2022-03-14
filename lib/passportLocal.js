const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Biodata } = require('../models')

async function authenticate(username, password, done) {
  try {
    const admin = await Biodata.authenticate({
      username,
      password
    })
    return done(null, admin)
  } catch(err) {
    return done(null, false, {
      message: err.message
    })
  }
}

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, authenticate)
)

passport.serializeUser(
  (admin, done) => done(null, admin.id)
)

passport.deserializeUser(
  async (id, done) => done(null, await Biodata.findByPk(id))
)

module.exports = passport