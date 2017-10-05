var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  db = mongoose.connect('mongodb://localhost/jwt');
// User = require('./models/userModel');
// cors = require('cors');

var port = 3000;

var app = express();

app.use(bodyParser.json());
// app.use(cors);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
})

var User = mongoose.model('User', {
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

app.post('/register', function(req, res) {
  var user = req.body;

  var newUser = new User({
    email: user.email,
    password: user.password
  })
  newUser.save(function(err) {
    res.status(200)
      .json(newUser);
  })

  // res.send("hi");
})


var server = app.listen(port, function() {
  console.log('api listening on ', port);
})
