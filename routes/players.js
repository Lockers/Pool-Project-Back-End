const router = require('express').Router();
let Player = require('../models/players.model');

router.route('/').get((req, res) => {
    Player.find()
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    console.log(req.params.id)
    Player.find({ leaguePosition: req.params.id })
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/league-table').get((req, res) => {
    Player.find().sort({ leaguePosition })
        .then(position => res.json(position))
        .catch(err => res.status(400).json('Error: ' + err))

})

router.route('/').post((req, res) => {
    const newPlayer = new Player(req.body)
    Player.save(newPlayer)

        .then(() => res.json('Player Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').put((req, res) => {
    Player.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => res.json('Player Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;