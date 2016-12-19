/**
 * Created by:  Jose Ortiz
 * Date:        November 6, 2016
 * File:        q_lobbies.js
 * Description: Contains the general queries used to access the database entity lobbies of this app
 *              This file will be required by an object of the class DatabaseManager located
 *              in the file dbManager.js
 */


var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};
var config = require('../../config/globals');
var sessions = require('../../config/sessions');
var pgp = require('pg-promise')(options);
/* Local database connection */
var dbConnLocal = config.DATABASE_PROVIDER + config.DATABASE_USERNAME + ":" +
    config.DATABASE_PASSWORD + config.DATABASE_URL + config.DATABASE_NAME

/* Heroku database connection */
var dbConnHeroku = config.DATABASE_HEROKU_URL

var connection = dbConnHeroku || dbConnLocal;

var db = pgp(dbConnHeroku);

function getAllGames(req, res, next) {
    db.any('select * from users join games on (users.id = games.player1)')
        .then(function (data) {
            var jsonData = {
                status: 'success',
                games: data,
                message: 'Retrieved ALL games'
            }
            res.status(200)
                .json(jsonData);
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleGame(req, res, next) {
    var gameID = parseInt(req.params.id);
    db.one('select * from games where id = $1', gameID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    games: data,
                    message: 'Retrieved one game'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}


function createGame(req, res, next) {
    db.one('insert into games(player1, player2, gamename, isfull, winner, totalscore)' +
        'values(' + sessions.USER_SESSION + ', 0, ${name}, 0, 0, 0) returning id', req.body)
        .then(function (data) {
            if (res.status(200)) {
                sessions.GAME_SESSION = data.id;
                res.redirect('/gameplay?player1=' + sessions.USER_SESSION + '&playerName=' + sessions.USER_SESSION_NAME + '&player2=' + sessions.JOINED_USER_SESSION +
                    '&gameid=' + sessions.GAME_SESSION);
            }
        })
        .catch(function (err) {
            return next(err);
        });
}


function updateScore(req, res, next) {
    db.none('update games set totalscore=$1 where id=$2',
        [parseInt(req.body.totalscore), parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated game'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function removeGame(req, res, next) {
    var gameID = parseInt(req.params.id);
    db.result('delete from games where id = $1', gameID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} game'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}


// add query functions

module.exports = {
    getAllGames: getAllGames,
    getSingleGame: getSingleGame,
    createGame: createGame,
    updateScore: updateScore,
    removeGame: removeGame
}
