const Player = require('../models/players.model');

exports.getPlayers = (req, res, next) => {
    Player.find().sort({ leaguePosition: 'asc' })
        .then(Player => res.json(Player))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.getPlayerById = (req, res, next) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.addPlayer = (req, res, next) => {
    Player.updateMany(
        { leaguePosition: { $gte: req.body.leaguePosition } },
        { $inc: { leaguePosition: + 1 } })
        .then(res => {
            return Player.create(req.body)
        })
        .then(() => res.json('Player Added'))
        .catch(err => res.status(400).json('Error: ' + err))
}