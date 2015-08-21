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

	// If in dev environment, use morgan logger to display http requests in server console.
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Set view engine and view directory
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Use body parser middleware to decode json data
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	// Use express-session middleware to handle session cookies and store session
	// data on server.
	// TODO: Research and implement a session store. express-session defaults to using
	// a new MemoryStore, which is not intended for production environment.
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set up passportJS to handle user authentication.
	app.use(passport.initialize());
	app.use(passport.session());

	// Enable loading of static files from public directory.
	app.use(express.static('public'));

	// Routing middleware is set up in individual modules and must be
	// 'registered' here to function in the app.
	require('../app/routes/index.server.routes')(app);
	require('../app/routes/users.server.routes')(app);
	require('../app/routes/places.server.routes')(app);

	return app;
};
