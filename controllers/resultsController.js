const Results = require('../models/results.model');
const Player = require('../models/players.model');
const Challenges = require('../models/challenges.model');

exports.getResults = (req, res, next) => {
    Results.find().sort({ date: 'desc' })
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err))
}