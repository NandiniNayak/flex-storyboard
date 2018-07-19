var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

//passport config - the module in the file required is a function, which accepts an argument passport
require('./config/passport')(passport);
//Load routes
var auth = require('./routes/auth');

var app = express();

app.get('/',(req, res) => {
  res.send('HOME');
});


// use auth routes : anything that routes to /auth goes to auth.js
app.use('/auth', auth);

var port = process.env.PORT || 3000;
// start the server and loisten on the port
app.listen(port, () => {
  // res.send('HELLO');
  console.log(`started server on port ${port}`);
})
