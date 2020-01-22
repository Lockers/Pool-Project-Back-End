const Challenges = require('../models/challenges.model')
const Player = require('../models/players.model');
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')

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

exports.createChallenge = [

    body('challenger').isLength({ min: 1, max: 30 }).trim().withMessage('Challenger Must be specified')
        .isAscii().withMessage('Challenger Contains weird Characters'),
    body('challenged').isLength({ min: 1, max: 30 }).trim().withMessage('Challenger Must be specified')
        .isAscii().withMessage('Challenger Contains weird Characters'),
   
    sanitizeBody('challenger').escape(),
    sanitizeBody('challenged').escape(),
    sanitizeBody('venue').escape(),
    sanitizeBody('date').toDate(),

    (req, res, next) => {

        const errors = validationResult(req);

        const challenge = new Challenges({
            challenger: req.body.challenger,
            challenged: req.body.challenged,
            venue: req.body.venue,
            ruleset: req.body.ruleset,
            pot: req.body.pot
        })

        if (!errors.isEmpty()) {
            res.status(404).json({
                title: 'Update Challenge',
                challenge: challenge,
                errors: errors.array()
            })
                return;
        }
        else {
            Challenges.create(challenge)
                .then(() => Player.updateOne({ name: req.body.challenger }, { $set: { challengable: false } }))
                .catch(err => res.status(400).json('Error: ' + err))
                .then(() => Player.updateOne({ name: req.body.challenged }, { $set: { challengable: false } }))
                .catch(err => res.status(400).json('Error: ' + err))
                .then(() => res.end('Challenge Added'))
                .catch(err => res.status(400).json('Error: ' + err))
        }
    }
]