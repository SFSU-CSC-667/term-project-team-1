var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    //Do whatever...
    var error = "error";
    if (req.parameters.error == 1)
    {
        error = 'Your email or password are incorrect';
    }
    res.render('test', {h3: error});
});




module.exports = router;
