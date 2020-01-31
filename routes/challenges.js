const router = require('express').Router();

const challengeController = require('../controllers/challengeController');

router.get('/', challengeController.getChallenges);

router.get('/:id', challengeController.getSingleChallenge);

router.delete('/:id', challengeController.deleteChallenge);

router.put('/:id', challengeController.updateChallenge);

router.post('/', challengeController.createChallenge);

module.exports = router;