const router = require('express').Router();
const Player = require('../models/players.model');

const playerController = require('../controllers/playersController');

router.get('/', playerController.getPlayers);

router.get('/:id', playerController.getPlayerById);

router.post('/', playerController.addPlayer);

module.exports = router;