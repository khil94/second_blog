var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var users = require('/user');

module.exports = ()=>{
    passport.serializeUser((user,done)=>{
        done(null,user);
    });
}


