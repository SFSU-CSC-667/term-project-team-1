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

function getAllLobbies(req, res, next) {
    db.any('select * from lobbies')
        .then(function (data) {
            var jsonData = {
                status: 'success',
                lobbies: data,
                message: 'Retrieved ALL Lobbies'
            }
            res.status(200)
                .json(jsonData);
        })
        .catch(function (err) {
            return next(err);
        });
}

function getLobbiesByOwner(req, res, next) {
    var ownerID = parseInt(req.params.id);
    db.any('select * from lobbies where owner = $1', ownerID)
        .then(function (data) {
            var jsonData = {
                status: 'success',
                lobbies: data,
                message: 'Retrieved all lobbies for this owner'
            }
            res.status(200)
                .json(jsonData);
        })
        .catch(function (err) {
            return next(err);
        });
}


function getSingleLobby(req, res, next) {
    var lobbyID = parseInt(req.params.id);
    db.one('select * from lobbies where id = $1', lobbyID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    lobbies: data,
                    message: 'Retrieved one lobby'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}




function createLobby(req, res, next) {
    db.none('insert into lobbies(owner, name, isactive, max_games, max_players)' +
        'values(${owner}, ${name}, ${isactive}, 2,2)',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one lobby'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function updateLobby(req, res, next) {
    db.none('update lobbies set owner=$1, name=$2, isactive=$3 where id=$4',
        [parseInt(req.body.owner), req.body.name, req.body.isactive, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated lobby'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeLobby(req, res, next) {
    var lobbyID = parseInt(req.params.id);
    db.result('delete from lobbies where id = $1', lobbyID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} lobby`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}



// add query functions

module.exports = {
    getAllLobbies: getAllLobbies,
    getLobbiesByOwner : getLobbiesByOwner,
    getSingleLobby: getSingleLobby,
    createLobby: createLobby,
    updateLobby: updateLobby,
    removeLobby: removeLobby
}
