const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
var mongoClient = require("mongodb").MongoClient;
var ObjectId=require("mongodb").ObjectId
var upload = multer({ dest: "public/images" });
var db;
mongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err;
    db = client.db("parcelninja");
  }
);

cloudinary.config({
  cloud_name: "attainunightangle",
  api_key: "331565893295333",
  api_secret: "kiEgADJlCPfCnvYB3j-StZvkTo8"
});

var id
router.get("/", function(req, res) {
  id=req.session.uid
  console.log(id)
  if (req.session.loggedIn) {
    db.collection("ninja")
      .find({ email: req.session.email })
      .toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.render("ninjadashboard", {
          title: "Ninja Dashboard",
          script: "/ninja.js",
          data: result,
          fname: req.session.fname,
          lname: req.session.lname,
          email: req.session.email
        });
      });
  } else {
    res.redirect("/login/ninja");
  }
});

router.post("/statusAvail", function(req, res) {
  console.log(req.body);
  db.collection("ninja").updateOne(
    { _id: ObjectId(req.body.nid) },
    { $set: { Availability: req.body.status } },
    function(err, result) {
      if (err) throw err;
      console.log("updated");
      res.redirect("/ninjadashboard")
    }
  );
});


router.post("/statusDuty", function(req, res) {
  console.log(req.body);
  db.collection("ninja").updateOne(
    { _id: ObjectId(req.body.nid) },
    { $set: { duty: req.body.duty } },
    function(err, result) {
      if (err) throw err;
      console.log("updated");
      res.redirect("/ninjadashboard")
    }
  );
});

router.post("/update/:id",upload.single("photo"), async(req, res) => {
  
  const result = await cloudinary.uploader.upload(req.file.path, {
    width: 250,
    height: 250
  });
  console.log(result)
  console.log(req.body)
  db.collection("ninja").updateOne(
    {_id: ObjectId(req.params.id)},
    { $set: { locality: req.body.locality, phonenumber: req.body.mobile, city:req.body.city, 
      password: req.body.pass, photo:result.secure_url,} },
    function(err, result) {
      if (err) throw err;
      res.redirect("/ninjadashboard");
    }
  );
});

router.get("/orders", function(req, res) {
  if (req.session.loggedIn) {
    db.collection("parcel")
      .find({ ninjaid : id })
      .toArray(function(err, result) {
        console.log(result)
        if (err) throw err;
        res.render("ninjaorder", {
          title: "Ninja Dashboard",
          data: result,
          fname: req.session.fname,
          lname: req.session.lname,
          email: req.session.email
        });
      });
  }
});

router.post("/statusupdate/:id", function(req, res) {
  db.collection("parcel").updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { status: req.body.status} },
    function(err, result) {
      if (err) throw err;
      console.log("updated");
      res.redirect("/ninjadashboard/orders")
    }
  );
});

// router.post("/profileUpdate", function(req, res) {
//   console.log(req.body);
//   db.collection("ninja").updateOne(
//     { email: req.body.email },
//     {
//       $set: {
//         first_name: req.body.firstName,
//         last_name: req.body.lastName,
//         Phone: req.body.Phone,
//         Address: req.body.Address
//       }
//     },
//     function(err, result) {
//       if (err) throw err;
//       res.redirect("/ninjadashboard/ninjadash");
//     }
//   );
// });
// router.post("/orderUpdate", function(req, res) {
//   console.log(req.body);
//   db.collection("parcel").updateOne(
//     { _id: "5d7d1fbf33fb1d9f4103a702" },
//     { $set: { status: req.body.status } },
//     function(err, result) {
//       console.log(result);
//       if (err) throw err;
//       res.send("updated");
//     }
//   );
// });

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login/ninja");
});
module.exports = router;
