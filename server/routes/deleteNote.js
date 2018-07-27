const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const monk = require('monk');

const db = monk(process.env.NOTES_DB);

router.get('/:id', function(req, res) {
  const user = db.get(req.session.passport.user);
  const objectId = new ObjectID(req.params.id);
  user.remove({ _id: objectId }).then(
    success => {
      res.sendStatus(200);
    },
    error => {
      res.sendStatus(500);
    }
  );
});

module.exports = router;
