var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    mail: String,
    password: String
});

module.exports = mongoose.model('user',userSchema);