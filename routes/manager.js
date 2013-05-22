
/*
 * GET manager listing.
 */
 
var User = require("../data/UserModel")
var uuid = require('node-uuid');
var moment = require('moment');

exports.manager = function(req, res){
  
  if(req.session.isadmin != true){
    res.send("please login at first~");
    return;
  }

  var actionType = req.query.type;
  
  //create
  if(actionType == "create"){
  	create(req.query.name,req.query.tel,req.query.email,res);
  }
  //delete
  else if(actionType == "delete"){
  	delOne(req.query.id,res);
  }
  else{
    //query
    User.find().sort('-createDate').exec(function(err, docs) {
      res.render('manager', { userList: docs ,moment: moment});
    });
  }
};

function create(name,tel,email,res){
  if(!!name && name != ""){
  	User.create({id:uuid.v4(),name:name,tel:tel,email:email},function(err,doc){
  	  console.log("{save user}save ok~username=" + name);
  	  res.redirect('/m');
  	});
  }
  else{
  	console.log("{save user}name is blank!");
  }
}

function delOne(id,res){
  console.log(id);
  User.findOneAndRemove({id:id},function(err){
  	console.log("{delete User}save ok~id=" + id);
  	res.redirect('/m');
  });
}