var User = require('../app/models/user.server.model');
var context = describe;

describe('The User: model', function(){
  context('#hashPassword()', function () {
    it('should return true if password is valid', function (done) {

      var password = 'secret';
      var subject = new User({emailAddress:'hello@thinkful.com',password:password});

      subject.save(function(err) {
        // Confirm that that an error does not exist
        subject.comparePassword(password,function (err, areEqual) {
          // Confirm that that an error does not exist
          expect(err).to.not.be.ok;
          // Confirm that the areEqaul is `true`
          expect(areEqual).to.be.equal(true);
          done();
        });
      })
    });

    it('should return false if password is invalid', function (done) {

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
