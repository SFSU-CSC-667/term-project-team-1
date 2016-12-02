var express = require('express');
var router = express.Router();
var sessions = require('../server_classes/config/sessions');


/* GET users listing. */

router.get('/', function(req, res, next) {
    //Do whatever...
    if (sessions.USER_SESSION == -1) {
        res.render('test');
    }
    else
    {
        res.render('game');
    }
});



module.exports = router;
