var express = require("express");
var session = require("express-session");
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
router.use(
  session({
    secret: "Express session secret"
  })
);
router.use(express.urlencoded({ extended: false }));
router.use(express.static("public"));

//ninja
router.get("/ninja", function(req, res) {
  res.sendFile("loginninja.html", { root: "public" });
});

router.post("/auth", function(req, res) {
  db.collection("ninja")
    .find({})
    .toArray(function(err, result) {
      if (err) {throw err};
      for (var i = 0; i < result.length; i++) {
        if (
          result[i].email == req.body.email &&
          result[i].password == req.body.password
        ) {
          req.session.loggedIn = true;
          req.session.email = result[i].email;
          req.session.fname = result[i].first_name;
          req.session.lname = result[i].last_name;
          req.session.uid = result[i]._id;
          console.log( req.session.uid)
          return res.redirect("/ninjadashboard");
        }
      }
    });
});

// router.get("/ninjauser", function(req, res) {
//   if (req.session.loggedIn) {
//     res.redirect("/ninjadashboard");
//   } else {
//     res.redirect("/login/ninja");
//   }
// });


//ninjaUser
router.get("/customer", function(req, res) {
  res.sendFile("logincustomer.html", { root: "public" });
});

router.post("/authcustomer", function(req, res) {
  db.collection("ninjaUser")
    .find({})
    .toArray(function(err, result) {
      if (err) {
        throw err;
      }
      for (var i = 0; i < result.length; i++) {
        if (
          result[i].email == req.body.email &&
          result[i].password == req.body.password
        ) {
          req.session.loggedIn = true;
          req.session.fname = result[i].first_name;
          req.session.lname = result[i].last_name;
          req.session.email = result[i].email;
          req.session.photo = result[i].photo;
          req.session.phonenumber=result[i].phonenumber;
          req.session.locality=result[i].locality;
          req.session.uld=result[i]._id;
          return res.redirect("/clientdashboard");
        }
      }
    });
});

// router.get("/user", function(req, res) {
//   if (req.session.loggedIn) {
//     res.redirect("/clientdashboard");
//   } else {
//     res.redirect("/login/customer");
//   }
// });

module.exports = router;
