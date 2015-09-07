var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  firstname: String,
  lastname: String,
  email: {type: String, required: true}
});
//before save hash password with some salt
UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')){
    return next();
  }
  console.log('Making Pass');
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      console.log('Done!');
      next();
    });
  });
});

UserSchema.methods.verifyPassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return callback(err);
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('User', UserSchema);
