const express = require('express');
const router = express.Router();
const monk = require('monk');
const hljs = require('highlight.js').configure({
  useBR: true
});
const marked = require('marked').setOptions({
  highlight: (code) => hljs.highlightAuto(code).value,
  gfm: true,
  breaks: true,
  tables: true,
  smartlists: true,
});

const dbUrl = 'mongodb://' + process.env.dbUser + ':' + process.env.dbPass + '@notesmd-shard-00-00-afbpo.mongodb.net:27017,notesmd-shard-00-01-afbpo.mongodb.net:27017,notesmd-shard-00-02-afbpo.mongodb.net:27017/notes?ssl=true&replicaSet=notesmd-shard-0&authSource=admin'

const db = monk(dbUrl);

router.get('/:timestamp', function(req, res) {
  const user = db.get(req.session.passport.user)
  user.find(
    { timestamp: { $lt: parseInt(req.params.timestamp, 10) } },
    {
      sort: { timestamp: -1 },
      limit: 10
    }
  ).then(
      docs => {
        let notes = docs.map(
          note => {
            note.preview = marked(note.note);
            return note;
          }
        );
        console.log(notes);
        res.json(notes);
      }
    );
});

module.exports = router;
