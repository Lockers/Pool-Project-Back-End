const router = require('express').Router();
let Results = require('../models/results.model');
let Challenges = require('../models/challenges.model');

router.route('/').get((req, res) => {
    Results.find()
        .then(results => res.json(results))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const newResult = new Results(req.body);
    newResult.save()
        .then(() => res.json('Result Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;