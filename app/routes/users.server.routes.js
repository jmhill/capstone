var users = require('../controllers/users.server.controller');
var passport = require('passport');

function isAuthenticated(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/signin');
	}
}

module.exports = function(app) {
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect: '/my',
			failureRedirect: '/signin'
		}));

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.get('/signout', users.signout);

	app.get('/my', isAuthenticated, users.renderHome);
};
