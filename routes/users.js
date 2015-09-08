var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
//this will display all users, their names, and email addresses
router.get('/', function(req, res, next) {
  if(req.isAuthenticated() == true){
    var thisUser = req.user.firstname || 'Individual!';
    User.find({}, 'username firstname lastname email', function(err, users){
    res.render('users.jade', {users: users, thisUser: thisUser});
  });
  } else {
    res.send('Not Authorized');
  };
});

//refresh users list
router.get('/refresh', function(req, res, next) {
  if(req.isAuthenticated() == true){
    User.find({}, 'username firstname lastname email', function(err, users){
      res.json(users);
    });
  } else {
    res.send('Not Authorized');
  };
});

//this will destroy the session cookie and send back to login page - actual rendering is done client side.
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
