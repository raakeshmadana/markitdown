const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const monk = require('monk');

const dbUrl = 'mongodb://' + process.env.dbUser + ':' + process.env.dbPass + '@notesmd-shard-00-00-afbpo.mongodb.net:27017,notesmd-shard-00-01-afbpo.mongodb.net:27017,notesmd-shard-00-02-afbpo.mongodb.net:27017/notes?ssl=true&replicaSet=notesmd-shard-0&authSource=admin'

const db = monk(dbUrl);

router.post('/', function(req, res) {
  const user = db.get(req.session.passport.user);
  const objectId = new ObjectID(req.body.id);
  user.update({ _id: objectId }, { timestamp: new Date() , note: req.body.note }, { upsert: true })
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
