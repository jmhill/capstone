var places = require('../../app/controllers/places.server.controller.js');

module.exports = function(app) {
	app.route('/places')
		.post(places.addPlace)
		.get(places.getPlaces);

	app.delete('/places/:id', places.removePlace);
};
