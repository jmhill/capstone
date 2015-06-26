var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'emailAddress',
        passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({
                emailAddress: email
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
                
                if (!user.verifyPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                
                return done(null, user);
            });
        }
    ));
};