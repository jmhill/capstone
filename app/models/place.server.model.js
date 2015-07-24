var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
	city: String,
	country: {
		type: String,
		required: true
	},
	followers: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
	// tags: [{?}] TODO: Figure out best way to record tags
});

mongoose.model('Place', PlaceSchema);

// TODO pre-save hook to aggregate services (lifecycle hook?) have service return a function
