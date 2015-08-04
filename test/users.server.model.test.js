var app = require('../server.js');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var mongoose = require('mongoose');
var User = mongoose.model('User');

var user;

describe('User Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'First',
			lastName: 'Last',
			emailAddress: 'firstlast@test.com',
			password: 'password'
		});
		done();
	});
	
	afterEach(function(done) {
		User.remove(function() {
			done();
		})
	})

	describe('Authentication', function(){
	  describe('#comparePassword()', function () {
		  it('should return true if passwords match', function (done) {

		    var password = 'secret';
		    var subject = new User({
					emailAddress:'hello@thinkful.com',
					password:password
				});

		    subject.save(function(err) {
		      // Confirm that that an error does not exist
		      subject.comparePassword(password,function (err, areEqual) {
		        // Confirm that that an error does not exist
		      	should.not.exist(err);
		        // Confirm that the areEqaul is `true`
		        expect(areEqual).to.be.equal(true);
		        done();
		      });
		    })
		  });

	    it('should return false if password does not match', function (done) {

	      var password = 'secret';
	      var subject = new User({emailAddress:'hello@thinkful.com',password:password});
	      var fakePassword = 'imahacker';
	      subject.save(function(err){
	        // Confirm that that an error does not exist
	        subject.comparePassword(fakePassword,function (err, areEqual) {
	          // Confirm that that an error does not exist
	          expect(err).to.not.be.ok;
	          // Confirm that the areEqaul is `false`
	          areEqual.should.equal(false);
	          done();
	        });
	      })
	    });
	  });
	});

});
