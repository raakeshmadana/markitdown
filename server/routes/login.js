const express = require('express');
const router = express.Router();
const passport = require('passport');
const Account = require('../models/account');

router.post('/', passport.authenticate('local'), function(req, res) {
  res.json(req.user.username);
});

module.exports = router;
