const express = require('express');
const session = require('express-session');
const path = require('path');
var flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');


const app = express();

const passportConfig = require('./public/js/passport')
const indexRouter = require('./router/main');
const user = require('./models/user');
const board = require('./models/board');
const db = mongoose.connection;


// configure app to use bodyparser
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

//setting views
app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

//db
db.on('error',console.error);
db.once('open',()=>{
    console.log('connected to db');
});

mongoose.connect('mongodb://localhost/mongodb_3');

app.use(session({
    secret: "express-work",
    resave:false,
    saveUninitialized: true,
    cookie :{
        maxAge : 1000*60*2
    }
}));

// Initialize passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/',indexRouter);

//run server
const server = app.listen(8080, function(){
    console.log("Now the Sever running at #8080...");
})



module.exports = app;