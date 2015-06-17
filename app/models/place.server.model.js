var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
	name: String,
	tags: Array,
	reports: Array
});

mongoose.model('Place', PlaceSchema);