/**
 * Created by master_cs_se on 11/7/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render('register');
});

// POST http://localhost:8080/api/users
// parameters sent with
router.post('/users', function(req, res) {
    var email  = req.body.email;
    var name = req.body.name;
    var password = req.body.password;

    res.send(email + ' ' + name + ' ' + password);
});

module.exports = router;