const express = require('express');
const router = express.Router();
const monk = require('monk');

const dbUrl = 'mongodb://' + process.env.dbUser + ':' + process.env.dbPass + '@notesmd-shard-00-00-afbpo.mongodb.net:27017,notesmd-shard-00-01-afbpo.mongodb.net:27017,notesmd-shard-00-02-afbpo.mongodb.net:27017/notes?ssl=true&replicaSet=notesmd-shard-0&authSource=admin'

const db = monk(dbUrl);

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
