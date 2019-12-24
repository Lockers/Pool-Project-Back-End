const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultsSchema = new Schema({
    challenger: { type: String, required: true },
    challengerScore: { type: Number, required: true },
    challenged: { type: String, required: true },
    challengedScore: { type: Number, required: true },
    venue: { type: String, required: true },
    ruleset: { type: String, required: true },
    pot: { type: Number, required: true },
    date: { type: Date, required: false, default: Date(2019, 0, 1)}
});

const Results = mongoose.model('Results', resultsSchema);

module.exports = Results