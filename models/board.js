const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const schema = mongoose.Schema;

const saltRounds = 9;

var boardSchema = new schema({
    number: Number,
    title: String,
    author: String,
    date: Date,
    views: Number,
    content: String
},{versionKey: false});

// boardSchema.methods.enhash = function(pass){
//     return bcrypt.hashSync(pass,bcrypt.genSaltSync(saltRounds));
// }

// boardSchema.methods.compare = function(pass){
//     return bcrypt.compareSync(pass, this)
// }

module.exports = mongoose.model('board',boardSchema);