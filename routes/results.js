const router = require('express').Router();
let Results = require('../models/results.model');
let Player = require('../models/players.model');
let Challenges = require('../models/challenges.model');

router.route('/').get((req, res) => {
    Results.find().sort({date: 'desc'})
        .then(results => res.json(results))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/submit').post((req, res) => {
    console.log(req.body)
    if (parseInt(req.body.challengedScore) > parseInt(req.body.challengerScore)) {
        Player.findOneAndUpdate({ name: req.body.challenged }, { $inc: { played: + 1, won: + 1, totalPrizeMoney: + req.body.pot }})
            .then(() => Player.findOneAndUpdate({ name: req.body.challenged }, { $push: { results: req.body } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $inc: { played: + 1, lost: + 1, totalPrizeMoney: - req.body.pot } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.findOneAndUpdate({ name: req.body.challenger }, { $push: { results: req.body } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Results.create(req.body))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => res.json('Result Added'))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Challenges.findOneAndDelete({ _id: req.body._id }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.updateOne({ name: req.body.challenger }, { $set: { challengable: true } }))
            .catch(err => res.status(400).json('Error: ' + err))
            .then(() => Player.updateOne({ name: req.body.challenged }, { $set: { challengable: true } }))
            .catch(err => res.status(400).json('Error: ' + err))
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
                if (pos1 - pos2 === 1) {
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0}, { $set: { leaguePosition: pos1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                }
                if (pos1 - pos2 === 2) {
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                }
                if (pos1 - pos2 === 3) {
                    
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                }
                
                if (pos1 - pos2 === 4) {
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                } 
                if (pos1 - pos2 === 5) {
                    
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 4 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                } 
                if (pos1 - pos2 === 6) {
                   
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 5}, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 4 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                } 
                if (pos1 - pos2 === 7) {
                    
                    Player.findOneAndUpdate({ leaguePosition: pos2 }, { $set: { leaguePosition: 0 } })
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos1 }, { $set: { leaguePosition: pos2 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 6 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 5 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 4 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 3 }, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 2}, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: pos2 + 1}, { $inc: { leaguePosition: 1 } }))
                        .then(() => Player.findOneAndUpdate({ leaguePosition: 0 }, { $set: { leaguePosition: pos2 + 1 } }))
                        .catch(err => res.status(400).json('Error: ' + err))
                } 
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
})

module.exports = router;