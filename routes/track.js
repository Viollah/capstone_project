var express = require("express");
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var db;
mongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err;
    db = client.db("parcelninja");
  }
);
router.get("/", function(req, res) {
  db.collection("parcel")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
});
module.exports = router;
