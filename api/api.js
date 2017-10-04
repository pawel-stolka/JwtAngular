var express = require('express'),
  bodyParser = require('body-parser');
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

app.post('/register', function(req, res) {
	console.log(req.body);
  res.send("hi");
})


var server = app.listen(port, function() {
  console.log('api listening on ', port);
})
