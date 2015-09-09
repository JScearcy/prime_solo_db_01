var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/userpost');
var mongoose = require('mongoose');

/* GET users listing. */
//this will display all users, their names, and email addresses
router.get('/', function(req, res, next) {
  if(req.isAuthenticated() == true){
    var thisUser = req.user.firstname || 'Individual!';
    User.find({}, 'username firstname lastname email', function(err, users){
      Post.find({}, function(err, posts){
        res.render('users.jade', {users: users, posts: posts, thisUser: thisUser});
      })
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

router.post('/post', function(req, res, next) {
  if(req.isAuthenticated() == true){
    Post.create(req.body, function(err, post){
      if (err){
        next(err);
      } else{
        res.json(post);
      }
    })
  }
});

router.delete('/deletepost', function(req, res, next){
  if(req.isAuthenticated() == true){
    Post.findByIdAndRemove(req.body.id, function(err){
      if (err){
        console.log(err);
      } else {
        res.sendStatus(200);
      }
    })
  }
})

router.put('/editpost', function(req, res, next){
  console.log(req.body);
  if(req.isAuthenticated() == true) {
    Post.findByIdAndUpdate(req.body.id, {brew: req.body.brew, brewnotes: req.body.brewnotes}, function(err, post){
      res.send(req.body);
    });
  }
})
module.exports = router;
