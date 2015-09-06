var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated() == true){
    User.find({}, 'username firstname lastname email', function(err, users){
    res.render('users.jade', {users: users});
  });
  } else {
    res.send('Not Authorized');
  };
});

router.get('/refresh', function(req, res, next) {
  if(req.isAuthenticated() == true){
    User.find({}, 'username firstname lastname email', function(err, users){
      res.json(users);
    });
  } else {
    res.send('Not Authorized');
  };
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
