const router = require('express').Router();
let Player = require('../models/players.model'); 

router.route('/').get((req, res) => {
    Player.find()
        .then(player => res.json(player))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    console.log(req.body)
    const newPlayer = new Player(req.body);

    newPlayer.save()
        .then(() => res.json('Player Added'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;