
/*
 * GET admin login page.
 */

exports.login = function(req, res){
  var pass = req.query.pass;
  if(pass == "scoffeescoffee"){
    req.session.isadmin = true;
    res.redirect("/m");
  }
  else{
    res.send("need key!");
  }
};