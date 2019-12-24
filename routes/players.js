const router = require('express').Router();
let Player = require('../models/players.model');

// router.route('/individual/:id').get((req, res) => {
//     Player.find()
//         .then(player => res.json(player))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').get((req, res) => {
    Player.findById(req.params.id)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Player.find().sort({leaguePosition: 'asc'})
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const newPlayer = new Player(req.body)
    Player.save(newPlayer)

        .then(() => res.json('Player Added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').put((req, res) => {
    Player.findOneAndUpdate({ leaguePosition: req.params.id }, req.body)
        .then(() => res.json('Player Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
});
module.exports = router;