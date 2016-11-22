
var express = require('express');
var router = express.Router();

const config = require ("../server_classes/config/globals");
var db  = require('../server_classes/database/dbManager');
var databaseManager = new db(router);




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('leaders', {title: 'leaderboard'});
});





module.exports = router;




