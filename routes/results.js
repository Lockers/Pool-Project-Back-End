const router = require('express').Router();

const resultsController = require('../controllers/resultsController');

router.get('/', resultsController.getResults);

router.post('/submit', resultsController.submitResults);

module.exports = router;