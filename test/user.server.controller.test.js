var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var server = require('../server.js');
var app = server.app;

var user;

chai.use(chaiHttp);

describe('User Controller Tests', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'First',
			lastName: 'Last',
			emailAddress: 'test@test.com',
			password: 'password'
		});
		done();
	});

	describe('New user creation', function() {
	});
});
