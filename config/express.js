// Configuration file for express

var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var compress = require('compress');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
	var app = express();
	
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Set view engine and view directory
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.static('public'));

	require('../app/routes/index.server.routes')(app);
	require('../app/routes/users.server.routes')(app);
	
	return app;
};