const router = require('express').Router();
let Player = require('../models/players.model');
let Archive = require('../models/archives.model');


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
    
    const newPlayer = new Player(req.body)
    console.log(newPlayer)
    Player.create(newPlayer)

        .then(() => res.json('Player Added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/archive').post((req, res) => {
    console.log(req.body)
    const newArchive = new Archive(req.body)
    Archive.create(newArchive)

        .then(() => res.json('Player Added to Archive'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').put((req, res) => {
    Player.findOneAndUpdate({ leaguePosition: req.params.id }, req.body)
        .then(() => res.json('Player Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    console.log(req.params.id)
    Player.findByIdAndRemove(req.params.id)
        .then(response => {
        res.json(response)
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;