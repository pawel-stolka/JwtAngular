var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  mongoUrl = 'mongodb://localhost/jwt',
  User = require('./models/User.js'),
  // LoggedIn = require('./models/LoggedIn.js'),
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

// app.post('/register', function(req, res) {
//     var user = req.body;

//     var loggedIn = new LoggedIn({
//       email: user.email
//     });

//     loggedIn.save(function(err, done) {
//       if (err)
//         return res.send(err);
//       console.log("inside register loggedIn.save");
//       // createSendToken(newUser, res);
//     })

// })

app.post('/register', function(req, res) {
  var user = req.body;

  var newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err, done) {
    if (err)
      return res.send(err);
    console.log("inside register.save");
    createSendToken(newUser, res);
  })
})

app.get('/users', function(req, res) {

  var query = User.find();

  query.exec(function(err, users) {
    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
    return res.status(200).send({
      users: users
    });
  })
})

app.get('/loggedIn', function(req, res) {

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

  // res.json(jobs);
  var query = LoggedIn.find();

  query.exec(function(err, users) {
    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
    return res.status(200).send({
      loggedIn: users
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

var LoggedInSchema = new mongoose.Schema({
  email: String,
  LoggedAt: {
    type: Date,
    default: Date.now
  }
})
var LoggedIn = mongoose.model('LoggedIn', LoggedInSchema);

app.post('/login', function(req, res) {
  req.user = req.body;
  // console.log(req.user);

  var searchUser = {
    email: req.user.email
  };

  User.findOne(searchUser, null,
    function(err, user) {
      if (err) {
        res.status(401).send({ message: 'Probably no such a user in database...' });
      }

      if (!user) {
        res.status(401).send({ message: 'Wrong email/password' });
      } else {
        user.comparePasswords(req.user.password,
          function(err, isMatch) {
            if (err) throw err;

            if (!isMatch)
              return res.status(401).send({ message: 'Wrong email/password' });

            saveLoggedIn(user.email);
            createSendToken(user, res);
          })
      }
    })
})

function saveLoggedIn(email) {

  var user = new LoggedIn({ email: email });
  console.log("saveLoggedIn.....");

  user.save(function(err, done) {
    if (err) return handleError(err);
  })
  console.log(".....after saveLoggedIn");
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
