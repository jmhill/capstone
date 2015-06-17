// Configuration file for mongoose

var config = require('./config');
var	mongoose = require('mongoose');

module.exports = function () {
	var db = mongoose.connect(config.db);

	require('../app/models/user.server.model');
	require('../app/models/bucketList.server.model');
	require('../app/models/place.server.model');

	return db;
};
