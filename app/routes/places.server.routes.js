var places = require('../../app/controllers/places.server.controller.js');

module.exports = function(app) {
	app.route('/places')
		.post(places.create)
		.get(places.list);
};
