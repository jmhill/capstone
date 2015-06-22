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

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('pages/signin', {
			title: 'Sign-in Form',
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('pages/signup', {
			title: 'Sign Up',
		});
	} else {
		return res.redirect('/');
	}
};