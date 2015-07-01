var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('HTTP Requests to Server', function() {
	describe('Testing the GET Methods', function(){
		it('should render the index page on GET /', function(done){
			chai.request(app)
				.get('/')
				.end(function(err, res) {
					res.should.be.html.and.have.status(200);
					done();
				});
		});
		it('should render the signin page on GET /signin', function(done){
			chai.request(app)
				.get('/signin')
				.end(function(err, res) {
					res.should.be.html.and.have.status(200);
					done();
				});
		});
		it('should render the signup page on GET /signup', function(done){
			chai.request(app)
				.get('/signup')
				.end(function(err, res) {
					res.should.be.html.and.have.status(200);
					done();
				});
		});
	});
});
