const Player = require( './models/players.model')

const seedPlayers = async () => {
    try {
        const data = [{ leaguePosition: 1, name: 'Andreas Hadjilouca', played: 2, won: 2, lost: 0, totalPrizeMoney: 150, Challengable: true },
        { leaguePosition: 2, name: 'James Brennan', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 3, name: 'Craig Reynolds', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 4, name: 'Pete Williams', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 5, name: 'Simon Yeats', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 6, name: 'Ian Eldridge', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 7, name: 'Neil Pugh', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 8, name: 'Damian Currier', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 9, name: 'Mark Ash', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 10, name: 'Lewis Turner', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 11, name: 'George Allen', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 12, name: 'Matt Locklin', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 13, name: 'Paul Devey', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 14, name: 'Chris Griffiths', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 15, name: 'Ricky Leese', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 16, name: 'Tom Edwards', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 17, name: 'Sam Drake', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 18, name: 'Shaun Lane', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 19, name: 'Aaron Minshall', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 20, name: 'Ashley Kent', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 21, name: 'Jake Haynes', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 22, name: 'James Haywood', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 23, name: 'Karl Wilson', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 24, name: 'Paul Baker', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 25, name: 'Paul Mullinder', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 26, name: 'Carl Sendles', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 27, name: 'Sean Cross', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 28, name: 'Shane Biddulph', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 29, name: 'Andy Lewis', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 30, name: 'Dan Owen', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 31, name: 'Matthew Russell', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 32, name: 'Lee Gagg', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 33, name: 'Carl Roberts', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 34, name: 'Jamie Devey', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 35, name: 'Mark Wells', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 36, name: 'Carl Watkins', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 37, name: 'Toby Jones', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 38, name: 'Richie Bonner', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 39, name: 'Craig Williams', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 40, name: 'Greame Corten', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 41, name: 'Eddie Solon', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 42, name: 'Craig Baugh', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 43, name: 'Ryan Jenner', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 44, name: 'Jordan Evans', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 45, name: 'Jordan Roberts', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 46, name: 'Sam Hamilton', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },
        { leaguePosition: 47, name: 'Gavin Evans', played: 0, won: 0, lost: 0, totalPrizeMoney: 500, Challengable: true },]
    
        data.forEach(user => {
            Player.save(user)
        })
    } catch (error) {
        console.log(error)
    }

}
