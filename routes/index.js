
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. - if there's a login error it will display it above login */
router.get('/', function(req, res, next) {
  var fail = req.flash();
  res.render('index', {failmessage: fail.error});
});

//this is the route that is taken when login form post happens
router.post('/',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/',
    failureFlash: true
  })
);

module.exports = router;
