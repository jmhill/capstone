// Configuration file for mongoose

var config = require('./config');
var	mongoose = require('mongoose');

module.exports = function () {
	var db = mongoose.connect(config.db);

	// require('model'); require the models here

	return db;
};