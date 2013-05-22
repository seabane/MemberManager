
/*
 * GET manager listing.
 */
 
var Log = require("../data/LogModel")
var User = require("../data/UserModel")
var moment = require('moment');

exports.log = function(req, res){
  if(req.session.isadmin != true){
    res.send("please login at first~");
    return;
  }
  var actionType = req.query.type;
  
  //create
  if(actionType == "create"){
  	create(req.query.userId,req.query.inorout,req.query.money,req.query.detail,res);
  }
  //delete
  else if(actionType == "delete"){
  	delOne(req.query.id,res);
  }
  
  res.redirect('/u?id=' + req.query.userId);
};

function create(userId,inorout,money,detail,res){
  if(!!money && money != ""){
    User.find({id:userId},function(err, userList) {
      var oldBlance = userList[0].balance;
      //if calc is error,balance is not change.so at first set new = old.
      var newbalance = oldBlance;
      if(inorout == "in"){
        newbalance = oldBlance + parseInt(money);
      }
      else if(inorout == "out"){
        newbalance = oldBlance - parseInt(money);
      }
      userList[0].balance = newbalance;
      userList[0].save(function(err){
        Log.create({userId:userId,inorout:inorout,money:money,detail:detail,balance:newbalance},function(err,log){
          console.log("{save log}save ok!userId=" + userId);
        });
      });
    });
  }
  else{
  	console.log("{save log}param is error!");
  }
}

function delOne(id,res){
  
}