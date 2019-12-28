const router = require('express').Router();
let Results = require('../models/results.model');
let Player = require('../models/players.model');

router.route('/').get((req, res) => {
    Results.find()
        .then(results => res.json(results))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    if (req.body.challengerScore > req.body.challengedScore) {
        console.log('Happy Path')
        console.log(req.body.challenger)
        Player.updateOne({ name: req.body.challenger }, {results: req.body}, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } })
            .then(response => console.log(response))
            .then(res => Player.updateOne({ name: req.body.challenged }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
        .then(response => console.log(response))
    }
    Results.create(req.body)
    .then(() => res.json('Result Added'))
    .catch(err => res.status(400).json('Error: ' + err))
   
});

module.exports = router;