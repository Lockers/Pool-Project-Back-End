const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playersSchema = new Schema({
    name: { type: String, required: true, trim: true},
    dateOfBirth: { type: Date, default: Date() },
    leaguePosition: { type: Number, required: true, unique: true },
    played: { type: Number, required: true },
    won: { type: Number, required: true },
    lost: { type: Number, required: true },
    totalPrizeMoney: { type: Number, required: true },
    challengable: { type: Boolean, required: true }
}, {
    timestamps: true,
});

const Player = mongoose.model('Players', playersSchema);

module.exports = Player;