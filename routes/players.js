const router = require('express').Router();
let Player = require('../models/players.model');


router.route('/').get((req, res) => {

    Player.find().sort({ leaguePosition: 'asc' })
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    Player.updateMany(
        { leaguePosition: { $gte: req.body.leaguePosition } },
        { $inc: { leaguePosition: + 1 } })
        .then(res => {
            return Player.create(req.body)
        })
        .then(() => res.json('Player Added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').put((req, res) => {
    Player.findOneAndUpdate({ leaguePosition: req.params.id }, req.body)
        .then(() => res.json('Player Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {

    const player = req.params.id

    Player.findOneAndDelete({ name: player })
        .then((res) => Player.updateMany(
            { leaguePosition: { $lte: req.body.leaguePosition } },
            { $inc: { leaguePosition: - 1 } }))
        .then(() => res.json('Player Deleted'))
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
})

module.exports = router;