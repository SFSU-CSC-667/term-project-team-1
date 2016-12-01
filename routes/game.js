/**
 * Created by leo on 11/28/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    //Do whatever...
    res.render('game');
});



module.exports = router;
