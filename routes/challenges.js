const router = require('express').Router();
let Challenges = require('../models/challenges.model');

router.route('/').get((req, res) => {
    Challenges.find()
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const newChallenge = new Challenges(req.body);

    newChallenge.save()
        .then(() => res.json('Challenge Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;