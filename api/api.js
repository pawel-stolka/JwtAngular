var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  mongoUrl = 'mongodb://localhost/jwt',
  User = require('./models/User.js'),
  jwt = require('jwt-simple');
// cors = require('cors');
var SECRET = "shh...";

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

  var payload = {
    iss: req.hostname,
    sub: newUser.id
  }

  var token = jwt.encode(payload, SECRET);

  newUser.save(function(err, done) {
    console.log('after save');

    if (err)
      return res.send(err);
    else
      return res.status(200)
        .send({
          user: newUser.toJSON(),
          token: token
        });
  })
})

var jobs = [
  'Michael Jordan',
  'Jennifer Aniston',
  'George Lucas',
  'Sean Connery'
];

app.get('/jobs', function(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }

  var token = req.headers.authorization.split(' ')[1],
    payload = jwt.decode(token, SECRET);

  if (!payload.sub) {
    res.status(401)
      .send({
        message: 'Authentication failed'
      });
  }

  res.json(jobs);
})

mongoose.connect(mongoUrl);

// console.log(jwt.encode('hi', 'secret'));

var server = app.listen(port, function() {
  console.log('api listening on ', port);
})
