const express = require('express');
const router = express.Router();
const monk = require('monk');
const marked = require('marked').setOptions({
  gfm: true,
  tables: true,
  smartlists: true
});

const db = monk(process.env.notesDbUrl);

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
        res.json(notes);
      }
    );
});

module.exports = router;
