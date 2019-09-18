const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/', function(req, res, next){
    res.render("index", {
        title: 'node'});
});
    
router.get('/login', function(req,res,next){
    res.render("login",{
        title: "node"
    });
});

router.post('/signup', function(req,res,next){
    var user = new User();
    user.mail = req.body.mail;
    user.password = req.body.password;

    user.save().then(function(){
        res.json({
            result:1
        });
    }).catch(function(err){
        res.json({
            result:0
        });
        console.error;
        return;
    });


    // res.render('signup',{
    //     title: 'node'
    // });
})


router.get('/user/:id',function(req,res,next){
    res.end();
});

router.get('/api/books/:id',function(req,res,next){
    res.end();
})



module.exports = router;