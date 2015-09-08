var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user');

//if for some reason someone goes to /register it will display a registration page
router.get('/', function(req, res, next){
  res.render('register');
})

//when the form is submitted - if there is an "already exists" error it will let you know
//otherwise it will create the user and send back only the user name.
router.post('/', function(req, res, next){
  User.create(req.body, function(err, post){
    if (err) {
      console.log(err.toJSON());
      if(err.code == 11000){
        res.json('Already exists');
      } else{
          next(err);
        }
     } else {
       res.json(req.body.username);
     }
  })
});

module.exports = router;
