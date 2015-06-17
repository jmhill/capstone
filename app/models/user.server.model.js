var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	emailAddress: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	bucketList: [{
		type: Schema.ObjectId,
		ref: 'BucketList'

	}],
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('User', UserSchema);