var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketListSchema = new Schema({
	listName: {
		type: String,
		default: 'My Destinations'
	},
	places: [{
		type: Schema.ObjectId,
		ref: 'Place'
	}]
});

mongoose.model('BucketList', BucketListSchema);
