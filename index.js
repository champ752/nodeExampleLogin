// main start point of the application
const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const passport = require('passport');

// install bcrypt-nodejs

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
// middleware registration
// morgan logging framework

app.use(morgan('combined'));
// accept all kind of request but it need to be json
app.use(bodyParser.json({type:'*/*'}));
// app.use(passport.initialize());
router(app);
//Server Setup
const port = process.env.PORT || 3090;
// create server with any requests fall into express
const server = http.createServer(app);
server.listen(port);
console.log('Server listening port',port);