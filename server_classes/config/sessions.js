/**
 * Created by   Jose Ortiz on 10/27/16.
 * File:        sessions.js
 * Description: Handles sessions for this app.
 * Usage:       1. Get a session
 *                var sessions = require('globals');
 *                var usr_session = sessions.USER_SESSION;
 *              2. Set a session
 *                 var sessions = require('globals');
 *                 const newID = 1;
 *                 sessions.USER_SESSION = newID;
 */


var app_sessions = {

    // database providers
    'USER_SESSION': -1, // session for user
    'USER_SESSION_NAME': '',
    'JOINED_USER_SESSION': -1, // session for user joined to a game.
    'GAME_SESSION': -1, // session for a game
    'EXPIRED_SESSION': 1, // determine if the session was expired
    'SESSION_EXPIRING_MAX_TIME': 60 * 1000 * 30 // must be in miliseconds

}


module.exports = app_sessions;