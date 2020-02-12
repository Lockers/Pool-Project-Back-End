const router = require('express').Router();
let User = require('../models/users.model');

router.route('/register').post((req, res) => {
    console.log(req.body)
   User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    User.create(res.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;