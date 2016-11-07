
var express = require('express');
var router = express.Router();

const config = require ("../server_classes/config/globals");
var db  = require('../server_classes/database/dbManager');
var databaseManager = new db(router);




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

databaseManager.loadDBAPI(config.USERS_API_ROUTE, config.LOBBIES_API_ROUTE, config.GAMES_API_ROUTE);



module.exports = router;




