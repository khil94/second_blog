var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => { 
      done(null, user); 
    });
  
    passport.deserializeUser((user, done) => { 
      done(null, user); 
    });

    passport.use("signup",new LocalStrategy(
        {
            usernameField : 'mail',
            passwordField : 'password',
            session : true,
            passReqToCallback : true
        },
        (req, mail, password, done)=>{
            User.findOne({mail:mail}, (err,user)=>{
                if(err) return done(err);
                if(user){
                    return done(null,false, req.flash("signupMessage","Mail address already exits"));
                }else{
                    var user = new User();
                    user.mail = mail;
                    user.password = user.enhash(password);
                    user.name = req.body.name;
                    user.save().then(()=>{
                        return done(null,user);
                    }).catch((err)=>{
                        if(err) throw err;
                    })
                }
            })
        }
    ));
  
    passport.use("login",new LocalStrategy(
        {
            usernameField : "mail",
            passwordField : 'password',
            session : true, 
            passReqToCallback : true
        }, (req, mail, password, done) => {
            User.findOne({ mail: mail }, (err, user) => {
                if (err) return done(err); 
                if (!user) return done(null, false
                        ,req.flash('loginMessage',"Cannot find user")); 
                if(user.compare(password)){
                    return done(null,user);
                }else{
                    return done(null,false, req.flash('loginMessage','Wrong password'));
                }
                });
            }
    ));
}

