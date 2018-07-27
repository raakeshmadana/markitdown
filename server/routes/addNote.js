const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk(process.env.notesDbUrl);

router.get('/', function(req, res) {
  const user = db.get(req.session.passport.user);
  user.insert({ timestamp: Date.now() , note: '' })
    .then(
      doc => {
        res.json(doc);
      },
      err => {
        res.sendStatus(404);
      }
    );
});

module.exports = router;
