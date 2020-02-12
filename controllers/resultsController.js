const Results = require('../models/results.model');
const Player = require('../models/players.model');
const Challenges = require('../models/challenges.model');

const updateResult = (req, res) => {
    Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } })
        .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
        .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
        .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
        .then(() => Results.create(req.body))
        .then(() => Challenges.findOneAndDelete({ _id: req.body._id }))
        .then(() => Player.updateOne({ name: req.body.challenger }, { $set: { challengable: true } }))
        .then(() => Player.updateOne({ name: req.body.challenged }, { $set: { challengable: true } }))
        .then(res.end())
}

exports.getResults = (req, res, next) => {
    Results.find().sort({ date: 'desc' })
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.submitResults = (req, res, next) => {
    if (parseInt(req.body.challengedScore) > parseInt(req.body.challengerScore)) {
        updateResult(req, res)
    }
    else {
        let pos1 = null;
        let pos2 = null;
        Player.find({ name: req.body.challenger }, 'leaguePosition')
            .then((res) => pos1 = res[0].leaguePosition)
            .catch(err => res.status(400).json('Error: ' + err))
            .then((res) => Player.find({ name: req.body.challenged }, 'leaguePosition'))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(res => { pos2 = res[0].leaguePosition })
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => {
                Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                    .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                    .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos1 } }))
                    .catch(err => res.status(400).json('Error: ' + err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot } }))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
            .then(() => Results.create(req.body))
            .then(() => Challenges.findOneAndDelete({ _id: req.body._id }))
            .then(() => Player.updateOne({ name: req.body.challenger }, { $set: { challengable: true } }))
            .then(() => Player.updateOne({ name: req.body.challenged }, { $set: { challengable: true } }))
            // .then((res) => res.status(200).json('Result Added'))
            .then(res.end())
        }
}
    //             if (pos1 - pos2 === 2) {
    //                 Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
    //                     .catch(err => res.status(400).json('Error: ' + err))
    //             }
    //             if (pos1 - pos2 === 3) {

    //                 Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
    //                     .catch(err => res.status(400).json('Error: ' + err))
    //             }

    //             if (pos1 - pos2 === 4) {
    //                 Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
    //                     .catch(err => res.status(400).json('Error: ' + err))
    //             }
    //             if (pos1 - pos2 === 5) {

    //                 Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 4 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
    //                     .catch(err => res.status(400).json('Error: ' + err))
    //             }
    //             if (pos1 - pos2 === 6) {

    //                 Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 5 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 4 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
    //                     .catch(err => res.status(400).json('Error: ' + err))
    //             }
    //             if (pos1 - pos2 === 7) {

    //                 Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 6 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 5 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 4 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
    //                     .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
    //                     .catch(err => res.status(400).json('Error: ' + err))
    //             }
    //         })


    // }


