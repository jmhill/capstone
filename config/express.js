// Configuration file for express

var config = require('./config');
var express = require('express');

module.exports = function() {
	var app = express();

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	require('../app/routes/index.server.routes')(app);
	
	return app;
};