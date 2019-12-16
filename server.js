'use strict';

var express = require('express');
var cors = require('cors');
var app = express();

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
var timeout = 10000;

var URL = require('./myApp.js').URLModel;

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

var mongoose = require('./myApp.js').mongoose;
app.get('/is-mongoose-ok', function(req, res) {
  if (mongoose) {
    res.json({isMongooseOk: !!mongoose.connection.readyState})
  } else {
    res.json({isMongooseOk: false})
  }
});

// your first API endpoint... 
var createURL = require('./myApp.js').createAndSaveURL;
app.post("/api/shorturl/new", function (req, res, next) {
  
  // in case of incorrect function use wait timeout then respond
  var t = setTimeout(() => { next({message: 'timeout'}) }, timeout);
  createURL(function(err, data) {
    clearTimeout(t);
    if(err) { return (next(err)); }
    if(!data) {
      console.log('Missing `done()` argument');
      return next({message: 'Missing callback argument'});
    }
    res.json(
    {
      original_url: req.body,
      short_url: 1
    }
    );
  });
  
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});