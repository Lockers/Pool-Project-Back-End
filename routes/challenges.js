const router = require('express').Router();
let Challenges = require('../models/challenges.model');

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


router.route('/').post((req, res) => {
    Challenges.create(req.body)
        .then(() => res.json('Challenge Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;