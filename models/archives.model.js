const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const archiveSchema = new Schema({
    _id: {type: String, required: false, trim: true},
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, default: Date() },
    leaguePosition: { type: Number, required: true },
    played: { type: Number, required: true },
    won: { type: Number, required: true },
    lost: { type: Number, required: true },
    totalPrizeMoney: { type: Number, required: true },
    challengable: { type: Boolean, required: true },
    results: {type: Array}
}, {
    timestamps: true,
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;