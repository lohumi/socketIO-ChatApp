# socketIO-ChatApp
This is socket based chat application.it consist of authentication feature using passportJs.
technology used- socket.io,express,mongodb,nodejs

Features of the App- 
1-login/ logout feature
2-chat room feature
3-user joined/left notifications
4-user is typing notification

how to run- please install all the package used in the package.json using "npm install" commnad .
after installing the packages, type "nodemon server.js" in the node command prompt. 
please refer packages used-

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
var config=require('./config/config');
var User=require('./models/user');

