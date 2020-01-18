const router = require('express').Router();
let Results = require('../models/results.model');
let Player = require('../models/players.model');
let Challenges = require('../models/challenges.model');

router.route('/').get((req, res) => {
    Results.find().sort({date: 'desc'})
        .then(results => res.json(results))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/stats/venues').get((req, res) => {
    try {    
    const data = []
        Results.find({ venue: 'WWFC' })
            .then(res => data.push({ name: 'WWFC', value: res.length }))
            .then(() => Results.find({ venue: 'Barley Mow' }))
            .then(res => data.push({ name: 'Barley Mow', value: res.length }))
            .then(() => Results.find({ venue: 'Dawley Social' }))
            .then(res => data.push({ name: 'Dawley Social', value: res.length }))
            .then(() => Results.find({ venue: 'Horseshoes' }))
            .then(res => data.push({ name: 'Horseshoes', value: res.length }))
            .then(() => Results.find({ venue: 'MD Legion' }))
            .then(res => data.push({ name: 'MD Legion', value: res.length }))
            .then(() => Results.find({ venue: 'Bell and Bails' }))
            .then(res => data.push({ name: 'Bell and Bails', value: res.length }))
            .then(() => Results.find({ venue: 'Mallard' }))
            .then(res => data.push({ name: 'Mallard', value: res.length }))
            .then(() => Results.find({ venue: 'Elephant and Castle' }))
            .then(res => data.push({ name: 'Elephant and Castle', value: res.length }))
            .then(() => Results.find({ venue: 'The Rock, 4a' }))
            .then(res => data.push({ name: 'The Rock, 4a', value: res.length }))
            .then(() => Results.find({ venue: 'Trench Labour' }))
            .then(res => data.push({ name: 'Trench Labour', value: res.length }))
            .then(() => Results.find({ venue: 'Miners Arms' }))
            .then(res => data.push({ name: 'Miners Arms', value: res.length }))
            .then(() => Results.find({ venue: 'Bayley' }))
            .then(res => data.push({ name: 'Bayley', value: res.length }))
            .then(() => {
                res.json(data)
            })

    } catch (error) {
        // next(error)
    }
})

router.route('/stats/challengeswon').get((req, res) => {
    try {
        console.log('firing')
        let data = []
        Results.find()
            .then((res) => {
                let counter = res.length
                res.forEach(item => {
                    if (item.challengerScore > item.challengedScore) {
                        data = [
                            { name: 'Challenger Won', value: counter = counter - 1 },
                            { name: 'Challenged Won', value: res.length - counter }
                        ]
                    }
                })
            })
            .then(() => res.json(data))


    } catch (error) {
        // next(error)
    }
})

router.route('/stats/rulesets').get((req, res) => {
    try {
        const data = []
        Results.find().or({ ruleset: 'BlackBall' }, { ruleset: 'Blackball' })
            .then(res => {
                
                data.push({ name: 'BlackBall', value: res.length })
            })
            .then(() => Results.find({ ruleset: 'World Rules' }))
            .then(res => { data.push({ name: 'World Rules', value: res.length }) })
            .then(() => Results.find({ ruleset: 'Old Rules' }))
            .then(res => data.push({ name: 'Old Rules', value: res.length }))
            .then(() => Results.find({ ruleset: '9 Ball' }))
            .then(res => data.push({ name: '9 Ball', value: res.length }))
            .then(() => Results.find({ ruleset: 'Supreme' }))
            .then(res => data.push({ name: 'Supreme', value: res.length }))
            .then(() => {
                res.json(data)
            })

    } catch (error) {
        // next(error)
    }
})

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