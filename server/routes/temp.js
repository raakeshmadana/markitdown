var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var monk = require('monk');
var db = monk('wpl:wolverine@ds121686.mlab.com:21686/meetup');

router.post('/', function(req, res){
	Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account){
		if(err){
		   res.json(0);	
		}
		else{
			passport.authenticate('local')(req, res, function() {
				res.json(req.body.username);
			});
		}
	});
});

module.exports = router;
