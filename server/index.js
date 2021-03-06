const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dbConnection = require('../database/config');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport=require('passport');
const MySQLStore = require('express-mysql-session')(session);
const router = require('./router.js');



// Note: add express server 
const app =  express();



//Note: Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/uploads',express.static(path.resolve(__dirname, '../uploads')));


//Note: add bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Note:add the session config
app.use(cookieParser());
var sessionStore = new MySQLStore({}, dbConnection);
app.use(session({
  secret: 'huhkjhjgyftdtgi45',
  resave: false,
  store: sessionStore,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Note: activate the router
app.use('/', router);

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
   console.error(`Server listening on port ${PORT}`);
});

