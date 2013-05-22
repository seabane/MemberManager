
/*
 * User model
 */
var Schema = require('mongoose').Schema;

var User = Schema({
    id : { type: String, index: true},
    name : String,
    tel : String,
    email : String,
    balance : { type: Number, default: 0},
    createDate : { type: Date, default: Date.now,index: true }
});

module.exports = db.model('User', User);