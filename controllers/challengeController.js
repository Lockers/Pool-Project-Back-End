const Challenges = require('../models/challenges.model')

exports.getChallenges = (req, res, next) => {
    Challenges.find().sort({ date: 'desc' })
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.getSingleChallenge = (req, res, next) => {
    Challenges.findById(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteChallenge = (req, res, next) => {
    Challenges.findByIdAndDelete(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateChallenge = (req, res, next) => {
    Challenges.findByIdAndUpdate(req.params.id, req.body)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.createChallenge = (req, res, next) => {
    Challenges.create(req.body)
        .then(() => Player.updateOne({ name: req.body.challenger }, { $set: { challengable: false } }))
        .catch(err => res.status(400).json('Error: ' + err))
        .then(() => Player.updateOne({ name: req.body.challenged }, { $set: { challengable: false } }))
        .catch(err => res.status(400).json('Error: ' + err))
        .then(() => res.json('Challenge Added'))
        .catch(err => res.status(400).json('Error: ' + err))
}