const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const challengesSchema = new Schema({
    challenger: { type: String, required: true },
    challenged: { type: String, required: true },
    venue: { type: String, required: false },
    ruleset: { type: String, required: false },
    pot: { type: Number, required: false },
    date: { type: Date, required: false, default: Date(2019, 0, 1)}
});

const Challenges = mongoose.model('Challenges', challengesSchema);

module.exports = Challenges