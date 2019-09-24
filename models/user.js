var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;

var userSchema = new schema({
    mail: String,
    password: String,
    name: String
},{versionKey: false});

userSchema.methods.comparePassword = function(inputPass, cb){
    if ( inputPass === this.password){
        cb(null, true);
    }else{
        cb('error');
    }
};

module.exports = mongoose.model('user',userSchema);