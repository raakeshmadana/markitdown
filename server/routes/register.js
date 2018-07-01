const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');

router.post('/', function(req, res){
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account){
    if(err){
      res.sendStatus(401);
    }
    passport.authenticate('local')(req, res, function() {
      res.json(req.body.uname);
    });
  });
});

module.exports = router;
