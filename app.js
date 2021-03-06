var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    localStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = require('./models/user'),
    flash = require('connect-flash');


var mongoURI = 'mongodb://localhost:27017/prime_example_passport';
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function (err) {
   console.log('mongodb connection error', err);
});
MongoDB.once('open', function () {
 console.log('mongodb connection open');
});

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');

var app = express();

app.use(session({
  secret: 'Sosecret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


passport.use('local', new localStrategy({
       passReqToCallback : true,
       usernameField: 'username'
   },
function(req, username, password, done){
   User.findOne({ username: username }, function(err, user) {
       if (err) throw err;
       if (!user)
           return done(null, false, {message: 'Incorrect username and password.'});

       user.verifyPassword(password, function(err, isMatch) {
           if (err) throw err;
           if(isMatch)
               return done(null, user);
           else
               return done(null, false, { message: 'Incorrect username and password.'});
       });
   });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err) done(err);
    done(null, user);
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
