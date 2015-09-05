var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user');

router.get('/', function(req, res, next){
  res.render('register');
})

router.post('/', function(req, res, next){
  console.log('Here!');
  User.create(req.body, function(err, post){
    if (err) {
       next(err)
     } else {
       res.redirect('/');
     }
  })
});

module.exports = router;
