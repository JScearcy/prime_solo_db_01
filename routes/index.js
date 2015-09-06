
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  var fail = req.flash();
  res.render('index', {failmessage: fail.error});
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/',
    failureFlash: true
  })
);

module.exports = router;
