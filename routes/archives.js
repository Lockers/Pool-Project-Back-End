const router = require('express').Router();

const archiveController = require('../controllers/archivesController');

router.post('/', archiveController.createArchives);

module.exports = router;