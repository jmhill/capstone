var Place = require('mongoose').model('Place');
var User = require('mongoose').model('User');

exports.renderPlaces = function(req, res, next) {
	if (req.user) {
		var id = req.user.id;
		User.findById(id, 'places')
			.populate('places')
			.exec(function(err, user) {
				if (err) {
					return next(err);
				} else {
					console.log("rendering place list now...\n", user.places);
					res.render('partials/places', {
						places: user.places
					});
				}
			});
	}
};

exports.addPlace = function(req, res, next) {
	var userid = req.user ? req.user.id : '';
	Place.findOne({
		city: req.body.city,
		country: req.body.country
	}, function(err, place) {
		if (err) {
			return next(err);
		} else {
			if (place) {
				console.log('Found place in database');
				place.followers.addToSet(userid);
				place.save(function(err) {
					if (err) {
						return next(err);
					}
					User.findById(userid, function(err, user) {
						user.places.addToSet(place._id);
						user.save(function(err) {});
					});
				});
				res.json(place);
			}
			else {
				console.log('Creating new place');
				var newPlace = new Place({
					city: req.body.city,
					country: req.body.country,
					googlePlaceId: req.body.googlePlaceId,
					followers: userid
				});
				newPlace.save(function(err) {
					if (err) {
						return next(err);
					}
					User.findById(userid, function(err, user) {
						user.places.addToSet(newPlace._id);
						user.save(function(err) {});
					});
				});
				res.json(newPlace);
			}
		}
	});
};

exports.removePlace = function(req, res, next) {
	var placeId = req.params.id;
	console.log(placeId);
	User.findById(req.user.id, function(err, user) {
		user.places.pull({ _id: placeId });
		user.save(function(err) {});
		res.json({ removed: true });
	});
};
