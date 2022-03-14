const { Room, UserGameHistory } = require('../models')

module.exports = {
  createRoom: (req, res) => {
    Room.create({
      roomName: req.body.roomName,
      createdBy: req.user.username
    })
      .then(data => res.status(200).json(data))
  },

  addHistory: (req, res) => {
    UserGameHistory.create({
      bioID: req.user.id,
      win: req.body.win,
      score: req.body.score
    })
      .then(riwayat => res.status(200).json(riwayat))
  }
}