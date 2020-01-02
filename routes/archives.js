const router = require('express').Router();
let Player = require('../models/players.model');
let Archive = require('../models/archives.model');

router.route('/').post((req, res) => {
    Archive.create(req.body)
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;