var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		console.log(req.body);
		user.save(function(err) {
			if (err) {
				return res.send(err);
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.redirect('/');
			});
		});
	} else {
		res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('pages/signin', {
			title: 'Sign-in Form',
			userFirstName: req.user ? req.user.firstName : ''
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('pages/signup', {
			title: 'Sign Up',
			userFirstName: req.user ? req.user.firstName : ''
		});
	} else {
		return res.redirect('/');
	}
};
