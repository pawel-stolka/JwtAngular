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

UserSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  console.log('deleted password. user:');
  console.log(user);
  return user;
}

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password'))
    return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      console.log('encrypted password: ' + user.password);
      next();
    })
  })


})

var User = mongoose.model('User', UserSchema);
exports.model = User;
