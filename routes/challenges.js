const router = require('express').Router();
let Challenges = require('../models/challenges.model');
let Player = require('../models/players.model');

router.route('/').get((req, res) => {
    Challenges.find()
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Challenges.findById(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Challenges.findByIdAndDelete(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    console.log(req.params.id, req.body)
    Challenges.findByIdAndUpdate(req.params.id, req.body)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').post((req, res) => {
    console.log(req.body)
    Challenges.create(req.body)
        .then(() => Player.updateOne({ name: req.body.challenger }, { $set: { challengable: false } }))
        .catch(err => res.status(400).json('Error: ' + err))
        .then(() => Player.updateOne({ name: req.body.challenged }, { $set: { challengable: false } }))
        .catch(err => res.status(400).json('Error: ' + err))
        .then(() => res.json('Challenge Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;