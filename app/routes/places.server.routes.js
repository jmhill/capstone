var places = require('../../app/controllers/place.server.controller.js');

module.exports = function(app) {
	app.route('/places')
		.post(places.create)
		.get(places.list);
};