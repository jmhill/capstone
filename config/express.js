// Configuration file for express

var config = require('./config');
var express = require('express');
var morgan = require('morgan');

module.exports = function() {
	var app = express();
	
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	require('../app/routes/index.server.routes')(app);
	require('../app/routes/users.server.routes')(app);
	
	return app;
};