var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function(next) {
  var user = this;
  console.log('this ' + this + ' in saving...');

  if (!user.isModified('password'))
    return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log('salt error...');
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      console.log('password: ' + user.password);
      user.password = hash;
      console.log('encrypted password: ' + user.password);
      next();
    })
  })


})

var User = mongoose.model('User', UserSchema);
exports.model = User;
