var express = require('express');
var router = express.Router();
var db = require("../server_classes/database/dbManager");
var config = require('../server_classes/config/globals');
var session = require('../server_classes/config/sessions');
var databaseManager = new db(router);

/* GET users listing. */

router.get('/', function (req, res, next) {

    logout();
    res.redirect('/login-page');
});

function logout() {
    if (session.EXPIRED_SESSION == 0) {
        session.USER_SESSION = -1; // remove user session
        session.JOINED_USER_SESSION = -1; // remove session from joined user.
        session.EXPIRED_SESSION = 1; // expire the session
        session.GAME_SESSION = -1; // expire game session.
        session.USER_SESSION_NAME = "";

    }
}

module.exports = router;
