//=================
//get all the packages
//=================
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var bodyparser=require('body-parser');
var morgan=require('morgan');
var mongoose=require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
//var jwt=require('jsonwebtoken');
var config=require('./config/config');
var User=require('./models/user');

require('./config/passport')(passport);


//=================
//configuration
//=================
var port=process.env.PORT||8080;
mongoose.connect(config.database);
//app.set('secret',config.secret);
app.use(cookieParser());
app.use(bodyparser());
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// required for passport
app.use(session({ secret: config.secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//log request
app.use(morgan('dev'));
//=================
//routes
//=================
require('./route.js')(app, passport);
var router=express.Router();


var people = {}; 
//default route

//save user credetial to DB
/*app.post('/login', function(req, res) {
	 console.log(req.body);
	 // create a  user
  var nick = new User({ 
    name: req.body.name, 
    password: req.body.password
     
  });
  console.log(nick);

  // save the  user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.redirect('chat');
    //res.json({ success: true });
    // res.sendFile(__dirname+ '/chat.html');
  });
});
*/

users = [];
people={};
io.on('connection',function(socket){
	console.log('a user connected');

	socket.on('setUsername',function(data) {
		if(users.indexOf(data) > -1){
      	socket.emit('userExists', data + ' username is taken! Try some other username.');
    	}
    	else{
     	 users.push(data);
     	 //console.log(users);
     	 //people[username] = name;
     	 socket.emit('userSet', {username: data},users);
    	 socket.broadcast.emit("userSet", {username: data},users);
        }
		});
	socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
  	});
	socket.on('disconnect',function(data){
	//io.sockets.emit('usergone', data);
	console.log('A user disconnected');
	});
	//listen to chat messages
	socket.on('chat message',function(msg) {
	io.emit('chat message',msg);
	});

	socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });

    socket.on("logout", function (data) {
    	console.log(data+'has disconnected');
        socket.emit("logout", data);
        socket.broadcast.emit("logout", data);
    });
});
 


http.listen(3000,function() {
	console.log('app is listening on port:3000');

});
