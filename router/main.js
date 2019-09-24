const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next){
    res.render("index", {
        title: 'node',
        user: req.user
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
        user:req.user
    });
})

router.post('/login', passport.authenticate("login", {
    failureRedirect:'/login',
    successRedirect : "/",
    failureFlash:true
    })
);


router.post('/signup', function(req,res,next){
    var user = new User();
    user.mail = req.body.mail;
    user.password = req.body.password;
    user.name = req.body.name;

    user.save().then(function(){
        res.json({
            result:1
        });
    }).catch(function(err){
        console.log(err);
        res.json({result:0});
        return ;
    })

});

router.get('/getuser',function(req,res,next){
    User.find(function(err, users){
        res.json(users);
        console.log(req.user)
    });
});



module.exports = router;