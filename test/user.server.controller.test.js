var server = require('../server.js');
var app = server.app;
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;

var mongoose = require('mongoose');
var User = mongoose.model('User');

var user;

chai.use(chaiHttp);

describe('User Controller Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'First',
			lastName: 'Last',
			emailAddress: 'test@test.com',
			password: 'password'
		});
		user.save(function() {
			done();
		});
	});

	afterEach(function(done) {
		User.remove(function() {
			done();
		})
	})

	describe('Testing the GET Methods', function(){
		it('should render and return the index page on GET /', function(done) {
			chai.request(app)
				.get('/')
				.end(function(err, res) {
					res.should.be.html.and.have.status(200);
					done();
				});
		});
		it('should render and return the signin page on GET /signin', function(done) {
			chai.request(app)
				.get('/signin')
				.end(function(err, res) {
					res.should.be.html.and.have.status(200);
					done();
				});
		});
		it('should render and return the signup page on GET /signup', function(done) {
			chai.request(app)
				.get('/signup')
				.end(function(err, res) {
					res.should.be.html.and.have.status(200);
					done();
				});
		});
	});

	/* CAUTION: Currently, these tests do not provide adequate
	 * coverage of the login and sign up processes.
	 * TODO: Research the Passport authentication flow and find
	 * decent method of testing routes/controllers that use passport
	 */
	describe('Testing the POST Methods:', function() {
		describe('Sign in process', function() {
			it('should redirect user to /signin if signin fails', function(done) {
				chai.request(app)
					.post('/signin')
					.send({
						'email': 'test@test.com',
						'password': 'incorrectPassword'
					})
					.end(function(err, res) {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						done();
					});
			});
			it('should redirect user to / if signin succeeds', function(done) {
				chai.request(app)
					.post('/signin')
					.send({
						'email': 'test@test.com',
						'password': 'password'
					})
					.end(function(err, res) {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						done();
					});
			});
		});
		describe('Sign up process', function() {
			it('should redirect user to homepage if already signed in', function(done) {
				chai.request(app)
					.post('/signup')
					.end(function(err, res) {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						done();
					});
			});
		});
	});
});
