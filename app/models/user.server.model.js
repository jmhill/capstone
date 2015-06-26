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
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('User', UserSchema);