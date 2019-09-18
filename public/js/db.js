var mongoose = require('mongoose');


var db = mongoose.connection;

db.on('error',console.error);
db.once('open',()=>{
    console.log('connected to db');
});

mongoose.connect('mongodb://localhost/mongodb_3');
