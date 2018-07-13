const express = require('express');
const router = express.Router();
const hljs = require('highlight.js').configure({
  tabBR: true
});
const marked = require('marked').setOptions({
  highlight: (code) => hljs.highlightAuto(code).value,
  gfm: true,
  breaks: true,
  tables: true,
  smartlists: true,
});

router.post('/', function(req, res) {
  res.json({html: marked(req.body.note)});
});

module.exports = router;
