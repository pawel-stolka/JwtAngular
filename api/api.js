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

  var date = new Date();
  console.log('something is happening... ' + date);
  next();
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

app.post('/register', function(req, res) {
  var user = req.body;

  var newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err, done) {
    if (err)
      return res.send(err);
    createSendToken(newUser, res);
  })
})

app.post('/login', function(req, res) {
  req.user = req.body;

  var searchUser = {
    email: req.user.email
  };

  User.findOne(searchUser, null,
    function(err, user) {
      if (err) throw err;

      if (!user)
        res.status(401).send({ message: 'Wrong email/password' });

      user.comparePasswords(req.user.password,
        function(err, isMatch) {
          if (err) throw err;

          if (!isMatch)
            return res.status(401).send({ message: 'Wrong email/password' });

          createSendToken(user, res);
          updateLoggedAt(user, res);
        })
    })
})

function updateLoggedAt(user) {
  var newUser = new User({
    email: user.email,
    password: user.password
  });
  newUser.save(function(err, done) {
    if (err)
      return res.send(err);

    return res.status(200)
      .send({
        user: user.toJSON(),
        loggedAt: new Date
      });
  })
}

function createSendToken(user, res) {
  var payload = {
    // iss: req.hostname,
    sub: user.id
  }

  var token = jwt.encode(payload, SECRET);

  console.log('after save');


  return res.status(200)
    .send({
      user: user.toJSON(),
      token: token
    });
}

mongoose.connect(mongoUrl);

// console.log(jwt.encode('hi', 'secret'));

var server = app.listen(port, function() {
  console.log('api listening on ', port);
})
