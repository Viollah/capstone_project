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

router.use(express.static("public"));


router.get("/", function(req, res) {
  res.sendFile("signup.html", { root: "public" });
});

router.get("/signupninja", function(req, res) {
  res.sendFile("signupninja.html", { root: "public" });
});
router.post("/", function(req, res) {
    db.collection("ninjaUser").insertOne(req.body);
    console.log(req.body);
    res.redirect("/login/customer");
  
});

router.post("/ninja", function(req, res) {
    db.collection("ninja").insertOne(req.body);
    console.log(req.body);
    res.redirect("/login/ninja");
});

module.exports = router;
