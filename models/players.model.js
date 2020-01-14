const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playersSchema = new Schema({
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, default: Date() },
    leaguePosition: { type: Number, required: true },
    played: { type: Number, required: true },
    won: { type: Number, required: true },
    lost: { type: Number, required: true },
    totalPrizeMoney: { type: Number, required: true },
    challengable: { type: Boolean, required: true },
    higestLeaguePosition: {type: Number, required: false},
    results: [
        {
            challenger: { type: String, required: true },
            challengerScore: { type: Number, required: true },
            challenged: { type: String, required: true },
            challengedScore: { type: Number, required: true },
            venue: { type: String, required: true },
            ruleset: { type: String, required: true },
            pot: { type: Number, required: true },
            date: { type: Date, required: true, default: Date(2019, 0, 1) }
        }
    ]

}, {
    timestamps: true,
});

const Player = mongoose.model('Players', playersSchema);

module.exports = Player;