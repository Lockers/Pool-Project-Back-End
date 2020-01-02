const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const archiveSchema = new Schema({
    name: { type: String, required: false, trim: true },
    dateOfBirth: { type: Date, required: false, default: Date() },
    played: { type: Number, required: false },
    won: { type: Number, required: false },
    lost: { type: Number, required: false },
    totalPrizeMoney: { type: Number, required: false },
    results: { type: Array }, required: false
}, {
    timestamps: true,
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;