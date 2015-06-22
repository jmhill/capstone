var users = require('../controllers/users.server.controller');
// var passport = require('passport');

module.exports = function(app) {
	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.route('/signin')
		.get(users.renderSignin)
		.post( /* passport authentication */ );
};