var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user');

router.get('/', function(req, res, next){
  res.render('register');
})

router.post('/', function(req, res, next){
  User.create(req.body, function(err, post){
    if (err) {
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
