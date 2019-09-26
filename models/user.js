const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const schema = mongoose.Schema;

const saltRounds = 10;

var userSchema = new schema({
    mail: String,
    password: String,
    name: String
},{versionKey: false});

userSchema.methods.enhash = function(pass){
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(saltRounds));
}


userSchema.methods.compare = function(pass){
    return bcrypt.compareSync(pass, this.password);
}

module.exports = mongoose.model('user',userSchema);