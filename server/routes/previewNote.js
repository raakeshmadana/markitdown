const express = require('express');
const router = express.Router();
const marked = require('marked').setOptions({
  gfm: true,
  tables: true,
  smartlists: true
});

router.post('/', function(req, res) {
  res.json({html: marked(req.body.note)});
});

module.exports = router;
