var express = require('express');
var router = express.Router();
var sessions = require('../server_classes/config/sessions');




/* GET users listing. */

router.get('/', function(req, res, next) {
    //Do whatever...
    if (sessions.USER_SESSION == -1) {



        res.render('login-page');


    }
    else
    {

        if (sessions.JOINED_USER_SESSION == sessions.USER_SESSION)
        {
            // user is playing against itself
        }
        else if (sessions.JOINED_USER_SESSION > -1)
        {
            // another user entered to the game
            // call socket io multiplayer logic from here
        }
        res.render('gameplay');



    }
});



module.exports = router;
