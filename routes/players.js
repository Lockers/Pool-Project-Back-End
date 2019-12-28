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
    Player.updateMany(
        { leaguePosition: { $gte: req.body.leaguePosition } },
        { $inc: { leaguePosition: + 1 } })
        .then(res => {
            return Player.create(req.body)
        })
        .then(() => res.json('Player Added'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/archive').post((req, res) => {
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
    Player.findById(req.params.id)
        .then(res => {
            return Player.updateMany(
                { leaguePosition: { $gt: res.leaguePosition } },
                { $inc: { leaguePosition: - 1 } })
        })
        .then(res => {
            return Player.findByIdAndRemove(req.params.id)
        })
        .then(() => res.json('Player Deleted'))
        .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router;