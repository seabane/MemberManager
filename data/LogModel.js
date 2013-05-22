
/*
 * Log model
 */

var Schema = require('mongoose').Schema;

var Log = Schema({
    date : { type: Date, default: Date.now,index: true },
    inorout : String,
    money : Number,
    balance : Number,
    detail : String,
    userId : String
}); 

module.exports = db.model('Log', Log);