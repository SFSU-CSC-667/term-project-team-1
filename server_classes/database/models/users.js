/**
 * Created by:  Jose Ortiz
 * Date:        November 6, 2016
 * File:        queries.js
 * Description: Contains the general queries used to access the database of this app
 *              This file will be required by an object of the class DatabaseManager located
 *              in the file dbManager.js
 */

/**
 * Created by master_cs_se on 11/5/16.
 */
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};
var config = require('../../config/globals');
var session = require('../../config/sessions');
var pgp = require('pg-promise')(options);

/* Local database connection */
var dbConnLocal = config.DATABASE_PROVIDER + config.DATABASE_USERNAME + ":" +
    config.DATABASE_PASSWORD + config.DATABASE_URL + config.DATABASE_NAME

/* Heroku database connection */
var dbConnHeroku = config.DATABASE_HEROKU_URL;
var db = pgp(dbConnHeroku);

function getAllUsers(req, res, next) {
    db.any('select * from users')
        .then(function (data) {
            var jsonData = {
                status: 'success',
                users: data,
                message: 'Retrieved ALL Users'
            };
            res.status(200)
                .json(jsonData);
        })
        .catch(function (err) {
            return next(err);
        });
}


function getSingleUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', userID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    users: data,
                    message: 'Retrieved ONE User'
                });
        })
        .catch(function (err) {
            return next(err);
        });

}

function validateUser (req, res, next) {

    var email = req.body.username;
    var password = req.body.password;



    db.one('Select * from users where email = $1 and password = $2', [email, password], req.body)
        .then(function (data) {
            var param = data.id;
            if(res.status(200)) {
                session.USER_SESSION = data.id;
                session.EXPIRED_SESSION = 0;
                /* Expires the session after expiring session time stated in sessions.js*/
                setInterval(function()
                {
                    session.USER_SESSION = -1; // remove user session
                    session.JOINED_USER_SESSION = -1; // remove session from joined user.
                    session.EXPIRED_SESSION = 1; // expire the session
                    session.GAME_SESSION = -1; // expire game session.
                }, session.SESSION_EXPIRING_MAX_TIME);
                res.redirect('/create_game');
            }

        })
        .catch(function (err) {
            res.redirect('/?error=1');
        });

}


function createUser(req, res, next) {
    req.body.score = parseInt(req.body.score);
    db.one('insert into users(email, name, password, score)' +
        'values(${email}, ${name}, ${password}, 0) returning id',
        req.body)
        .then(function (data) {

            if (res.status(200)) {
                session.USER_SESSION = data.id;
                session.EXPIRED_SESSION = 0;
                /* Expires the session after expiring session time stated in sessions.js*/
                setInterval(function()
                {
                    session.USER_SESSION = -1; // remove user session
                    session.JOINED_USER_SESSION = -1; // remove session from joined user.
                    session.EXPIRED_SESSION = 1; // expire the session
                    session.GAME_SESSION = -1; // expire game session.
                }, session.SESSION_EXPIRING_MAX_TIME);
                res.redirect('/create_game');
            }

        })
        .catch(function (err) {
            return next(err);
        });
}


function updateUser(req, res, next) {
    db.none('update users set email=$1, name=$2, password=$3, score=$4 where id=$5',
        [req.body.email, req.body.name, req.body.password,
            parseInt(req.body.score), parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeUser(req, res, next) {
    var userID = parseInt(req.params.id);
    db.result('delete from users where id = $1', userID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} user'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}







// add query functions

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser,
    validateUser: validateUser
};
