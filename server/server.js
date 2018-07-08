const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const dbUrl = 'mongodb://' + process.env.dbUser + ':' + process.env.dbPass + '@notesmd-shard-00-00-afbpo.mongodb.net:27017,notesmd-shard-00-01-afbpo.mongodb.net:27017,notesmd-shard-00-02-afbpo.mongodb.net:27017/users?ssl=true&replicaSet=notesmd-shard-0&authSource=admin'

//Import routes
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const addNote = require('./routes/addNote');

const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

//Main config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client/public')));

//Session config
app.use(session({ 
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Passport config
const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Database connection
mongoose.connect(dbUrl);

//Use routes
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/addNote', addNote);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

app.listen(3000, function() {
  console.log('App listening on port 3000\n');
});
