var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

// global.environment = 'test';  <--- Change this to reflect testing config
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Bucket List of Destinations', function(){
	it('should list destinations on GET request', function(done){
		chai.request(app).
			.get('/list/places')
			.end(function(err, res) {
				res.should.be(json);
				res.body.should.be.a('array');
				done();
			});
	});
});