const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const monk = require('monk');

const db = monk(process.env.NOTES_DB);

router.post('/', function(req, res) {
  const user = db.get(req.session.passport.user);
  const objectId = new ObjectID(req.body.id);
  user.update({ _id: objectId }, { timestamp: Date.now() , note: req.body.note }, { upsert: true })
    .then(
      success => {
        res.sendStatus(200);
      },
      error => {
        res.sendStatus(404);
      }
    );
});

module.exports = router;
