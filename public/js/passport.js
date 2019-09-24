var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => { 
      done(null, user); 
    });
  
    passport.deserializeUser((user, done) => { 
      done(null, user); 
    });
  
    passport.use("login",new LocalStrategy(
        {
            usernameField : "mail",
            passwordField : 'password',
            session : true, 
            passReqToCallback : true
        }, (req, mail, password, done) => {
            User.findOne({ mail: mail }, (err, user) => {
                if (err) return done(err); 
                if (!user) 
                    return done(null, false
                        ,req.flash('loginMessage',"Cannot find user")
                        ); 
                return user.comparePassword(password, (passError, isMatch) => {
                if (isMatch) {
                    return done(null, user); 
                }
                return done(null, false
                    ,req.flash('loginMessage',"Wrong password")
                ); 
                });
            });
        }
    ));
}

