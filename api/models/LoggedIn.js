var mongoose = require('mongoose');

var LoggedInSchema = new mongoose.Schema({
  email: String,
  LoggedAt: {
    type: Date,
    default: Date.now
  }
})

LoggedInSchema.pre('save', function(next) {
  var user = this;

  console.log(user + " has logged in at...")

})

var LoggedIn = mongoose.model('LoggedIn', LoggedInSchema);
module.exports = LoggedIn;
