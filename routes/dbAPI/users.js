var express = require('express');
var router = express.Router();
var db = require("../../server_classes/database/dbManager");
var config = require('../../server_classes/config/globals');
var databaseManager = new db(router);

/* GET users listing. */

router.get('/', function (req, res, next) {
    //Do whatever...
});


module.exports = router;
