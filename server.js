var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');



var app = express();
var indexRouter = require('./router/main');

app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use('/',indexRouter);

var server = app.listen(8080, function(){
    console.log("Now the Sever running at #8080...");
})

app.use(session({
    secret: "express-work",
    resave:false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));

