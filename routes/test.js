var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {

    res.render('test', {error: 'This is a test error'});
});




module.exports = router;
