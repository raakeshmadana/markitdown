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

const app = express();

if(process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.dev.js');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(logger('dev'));
}

//Import routes
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const addNote = require('./routes/addNote');
const saveNote = require('./routes/saveNote');
const getNotes = require('./routes/getNotes');
const previewNote = require('./routes/previewNote');
const deleteNote = require('./routes/deleteNote');

//Main config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../client/public')));

//Session config
app.use(session({ 
  secret: process.env.SESSION_SECRET,
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
mongoose.connect(process.env.USERS_DB);

//Use routes
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/addNote', addNote);
app.use('/saveNote', saveNote);
app.use('/getnotes', getNotes);
app.use('/previewNote', previewNote);
app.use('/deletenote', deleteNote);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

app.listen(3000, function() {
  console.log('App listening on port 3000\n');
});
