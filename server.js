// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8003;
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId
const passport = require('passport');
const flash    = require('connect-flash');
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');
let multer      = require('multer');

let configDB = require('./config/database.js');

let db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db, multer, ObjectId);
    });
 // connect to our database

require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash characters stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
