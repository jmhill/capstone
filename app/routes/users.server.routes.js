var users = require('../controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app) {
	app.route('/users')
		.get(users.list);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect: '/',
			failureRedirect: '/signin'
		}));

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.get('/signout', users.signout);
};