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
var pgp = require('pg-promise')(options);
var connectionString = config.DATABASE_PROVIDER + config.DATABASE_USERNAME + ":" +
    config.DATABASE_PASSWORD + config.DATABASE_URL + config.DATABASE_NAME
var db = pgp(connectionString);

function getAllGames(req, res, next) {
    db.any('select * from games')
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



function getGamesByLobby(req, res, next) {
    var lobbyID = parseInt(req.params.id);
    db.any('select * from games where lobbies_id = $1', lobbyID)
        .then(function (data) {
            var jsonData = {
                status: 'success',
                games: data,
                message: 'Retrieved all games for this lobby'
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
    db.none('insert into games(player1, player2, name, lobbies_id)' +
        'values(${player1}, ${player2}, ${name}, ${lobbies_id})', req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one game'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function updateGame(req, res, next) {
    db.none('update games set player1=$1, player2=$2, name=$3 where id=$4',
        [parseInt(req.body.player1), parseInt(req.body.player2), req.body.name, parseInt(req.params.id)])
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
                    message: `Removed ${result.rowCount} game`
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
    getGamesByLobby : getGamesByLobby,
    getSingleGame: getSingleGame,
    createGame: createGame,
    updateGame: updateGame,
    removeGame: removeGame
}
