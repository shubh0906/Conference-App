require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Events} = require('./models/event');
var {Tracks} = require('./models/track');

var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers","Content-Length,X-AUTH,X-Bar");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
  next();
});

require('./routes/user')(app);
require('./routes/track')(app);


// Events API collection

//End of Events API Collection


//Tracks API Collection


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
