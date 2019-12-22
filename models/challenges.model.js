const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const challengesSchema = new Schema({
    challenger: { type: String, required: true },
    challenged: { type: String, required: true },
    venue: { type: String, required: true },
    ruleset: { type: String, required: true },
    pot: { type: Number, required: true },
});

const Challenges = mongoose.model('Challenges', challengesSchema);

module.exports = Challenges