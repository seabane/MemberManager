
/*
 * GET draw qrcode page.
 */
var User = require("../data/UserModel");

exports.qrcode = function(req, res){

  if(req.session.isadmin != true){
    res.send("please login at first~");
    return;
  }

  var userId = req.query.id;
  User.find({id:userId},function(err, userList) {
    var url = "http://localhost:3000/u?id=" + userId;
    res.render('qrcode', {url:url,name:userList[0].name});
  });
};