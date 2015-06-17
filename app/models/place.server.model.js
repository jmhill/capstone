var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
	city: String,
	country: {
		type: String,
		required: true
	},
	// tags: [{?}] TODO: Figure out best way to record tags
});

mongoose.model('Place', PlaceSchema);