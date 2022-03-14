const passport = require('passport')

module.exports = {
  local: (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
  },

  jwt: passport.authenticate('jwt', {
    session: false
  })
}