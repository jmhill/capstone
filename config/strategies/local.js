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
                    console.log(err.message);
                    return done(err);
                }

                if (!user) {
                    console.log('User not found')
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }

                if (user.password != password) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }

                return done(null, user);
            });
        }
    ));
};
