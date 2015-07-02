var chai = require('chai');
var should = chai.should();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var user;

describe('User Model Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'First',
			lastName: 'Last',
			emailAddress: 'firstlast@test.com',
			password: 'password'
		});
		done();
	});

	it('User should exist', function(done) {
		user.should.exist;
		done();
	});
});
