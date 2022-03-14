const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Biodata } = require('../models')

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'Microservice App for Code Challenge 7'
}

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    Biodata.findByPk(payload.id)
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
)

module.exports = passport