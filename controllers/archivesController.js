const Archive = require('../models/archives.model');

exports.createArchives = (req, res, next) => {
    Archive.find().sort({ date: 'desc' })
        .then(Archive => res.json(Archive))
        .catch(err => res.status(400).json('Error: ' + err))
}