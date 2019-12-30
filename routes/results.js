const router = require('express').Router();
let Results = require('../models/results.model');
let Player = require('../models/players.model');

router.route('/').get((req, res) => {
    Results.find()
        .then(results => res.json(results))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    if (req.body.challengedScore > req.body.challengerScore) {
        console.log('Challenged Won', req.body.challenged, req.body.challengedScore, req.body.challengerScore)
        Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } })
            .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Results.create(req.body))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => res.json('Result Added'))
            .catch(err => res.status(400).json('Error: ' + err))
    }
    else {
        console.log('Challenger Won', req.body.challenger, req.body.challengedScore, req.body.challengerScore)
        Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } })
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Results.create(req.body))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => res.json('Result Added'))
            .catch(err => res.status(400).json('Error: ' + err))
    }
})

// router.route('/previous').post((req, res) => {
//     if (req.body.challengedScore > req.body.challengerScore) {
//         Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } })
//             .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => Results.create(req.body))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => res.json('Result Added'))
//             .catch(err => res.status(400).json('Error: ' + err))
//     }
//     if (req.body.challengedScore < req.body.challengerScore) {
//         Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } })
//             .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => Results.create(req.body))
//             .catch(err => res.status(400).json('Error: ' + err))
//             .then(() => res.json('Result Added'))
//             .catch(err => res.status(400).json('Error: ' + err))
//     }
//     })


module.exports = router;