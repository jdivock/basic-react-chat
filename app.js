'use strict';

var express = require('express');
var path = require('path');
var app = express();
var debug = require('debug')('basic-chat-server');
var port = process.env.PORT || 3000;

app.set('port', port);

app.listen(port, function() {
  debug('basic-chat is available at http://localhost:' + port);
});


app.use(express.static(path.join(__dirname, 'public')));

