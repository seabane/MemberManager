
/*
 * GET home page.
 */
 
var User = require("../data/UserModel");
var Log = require("../data/LogModel");
var moment = require('moment');

exports.member = function(req, res){
  var userId = req.query.id;
  User.find({id:userId},function(err, userList) {
      if(userList == null || userList.size == 0 ){
        res.send('no user for this id~!');
      }
      Log.find({userId:userId}).sort('-date').exec(function(err,logList){
      	res.render('member', { userList: userList,logList:logList,moment: moment,isAdmin:req.session.isadmin});
      });
    });
  
};