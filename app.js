var express = require('express')
var mongoose = require('mongoose')

var app = express();
var port = process.env.PORT || 3000;


app.get('/',(req, res) => {
  res.send('HOME');
})
// start the server and loisten on the port
app.listen(port, () => {
  // res.send('HELLO');
  console.log(`started server on port ${port}`);
})
