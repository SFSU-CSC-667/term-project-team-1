var express = require('express');
var router = express.Router();


/* GET users listing. */

router.get('/', function(req, res, next) {
    //Do whatever...
    res.render('lobbyRoom');
});



module.exports = router;
