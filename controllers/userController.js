const { Biodata, UserGameHistory } = require('../models')

function format(user) {
  const { id, username } = user

  return {
    id,
    username,
    accessToken: user.generateToken()
  }
}

module.exports = {
  
  // AUTH

  register: (req, res) => {
    Biodata.register(req.body)
      .then((user) => res.json(user))
  },

  login: (req, res) => {
    Biodata.authenticate(req.body)
      .then(user => res.json(format(user)))
  },

  profile: (req, res) => {
    
  }
}