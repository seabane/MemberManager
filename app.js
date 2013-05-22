
/**
 * Module dependencies.
 */

var express = require('express'),
  http = require('http')
  path = require('path');
  
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/testMM';
//var uri = 'mongodb://localhost/MemberManager';
global.db = mongoose.createConnection(uri);


var member = require('./routes/member');
var manager = require('./routes/manager');
var log = require('./routes/log');
var login = require('./routes/login');
var drawQrcode = require('./routes/qrcode');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/u', member.member);
app.get('/m', manager.manager);
app.get('/l', log.log);
app.get('/s', login.login);
app.get('/qrcode', drawQrcode.qrcode);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
