const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next){
    res.render("index", {
        title: 'node',
        user: req.user,
    });
});

router.get('/login', function(req, res, next){
    res.render('login',{
        title:'node',
        message:req.flash('loginMessage'),
        user:req.user
    });
})

router.get('/signup', function(req, res, next){
    res.render('signup',{
        title:'node',
        user:req.user,
        message:req.flash('signupMessage')
    });
})

router.get('/logout',function(req,res,next){
    req.logOut();
    res.redirect('/');
});

router.post('/login', passport.authenticate("login", {
    failureRedirect:'/login',
    successRedirect : "/",
    failureFlash:true
    })
);


router.post('/signup', passport.authenticate("signup",{
    failureRedirect:"signup",
    successRedirect:"/",
    failureFlash:true
})
);

router.get('/getuser',function(req,res,next){
    User.find(function(err, users){
        res.json(users);
        console.log(req.user)
    });
});



module.exports = router;