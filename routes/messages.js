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
router.post("/", function(req, res) {
  console.log(req.body);
  db.collection("messages").insertOne(req.body);
  res.redirect("/contact");
});
module.exports = router;
