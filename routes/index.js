
var express = require('express');
var router = express.Router();

const config = require ("../server_classes/config/globals");
var db  = require('../server_classes/database/dbManager');
var databaseManager = new db(router);

/* GET users listing. */
router.get('/', function(req, res, next) {
    var incorrectPassword = "";
    if (req.query.error == "1")
    {
        incorrectPassword = "Sorry, Your username or password are incorrect. Try again.";
    }
    //res.render('login-page', {title: 'logIn/signIn', ip: incorrectPassword});
    res.render('lobbyRoom', {title: 'logIn/signIn', ip: incorrectPassword})
});


databaseManager.loadDBAPI(config.USERS_API_ROUTE,
                          config.GAMES_API_ROUTE,
                          config.LOGIN_API_ROUTE);

module.exports = router;




