var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketListSchema = new Schema({
	places: Array
});

mongoose.model('BucketList', BucketListSchema);
