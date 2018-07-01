const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');

router.get('/', function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.json(1);
    }
  });
});

module.exports = router;
