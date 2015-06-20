var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketListSchema = new Schema({
	user: Schema.ObjectId,
	listName: {
		type: String,
		default: 'My Destinations'
	},
	places: [{
		type: Schema.ObjectId
	}]
});

mongoose.model('BucketList', BucketListSchema);
