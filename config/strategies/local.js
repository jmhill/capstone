var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email'
        },
        function(email, password, done) {
            User.findOne({
                emailAddress: email
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    console.log('User not found');
                    return done(null, false, {
                      message: 'Incorrect username.' // For flash messages
                    });
                } else {
                  user.comparePassword(password, function(err, isMatch) {
                    if (err) {
                      return done(err);
                    }

                    if (isMatch) {
                      return done(null, user);
                    } else {
                      return done(null, false, {
                        message: 'Incorrect password'
                      });
                    }
                  });
                }
            });
        }
    ));
};
