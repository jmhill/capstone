var Place = require('mongoose').model('Place');

exports.create = function(req, res, next) {
	var place = new Place(req.body);

	place.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(place);
		}
	});
};

exports.list = function(req, res, next) {
	Place.find({
		user_id: {}
	}, function(err, places) {
		if (err) {
			return next(err);
		} else {
			res.json(places);
		}
	});
};
