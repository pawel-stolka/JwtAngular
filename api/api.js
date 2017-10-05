var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  mongoUrl = 'mongodb://localhost/jwt',

  User = require('./models/User.js');
// cors = require('cors');

var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  console.log('something is happening...');
  next();
})


app.post('/register', function(req, res) {
  var user = req.body;

  var newUser = new User.model({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err, done) {
    console.log('after save');

    if (err)
      return res.send(err);
    else
      return res.status(200)
        .send(newUser.toJSON());
  })
})

mongoose.connect(mongoUrl);

var server = app.listen(port, function() {
  console.log('api listening on ', port);
})
