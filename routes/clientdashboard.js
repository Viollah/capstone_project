const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
var mongoClient = require("mongodb").MongoClient;
var ObjectId=require("mongodb").ObjectId
var upload = multer({ dest: "public/images" });
var db
mongoClient.connect(
  "mongodb://localhost:27017",
  { useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err;
    db = client.db("parcelninja");
  }
);
router.get("/", function(req, res) {
  if (req.session.loggedIn) {
    db.collection("ninja")
      .find({})
      .toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.render("client", {
          title: "Client Dashboard",
          style: "/client.css",
          script: "/fare.js",
          fname: req.session.fname,
          lname: req.session.lname,
          email: req.session.email,
          mob: req.session.phonenumber,
          loc: req.session.locality,
          pic: req.session.photo,
          id: req.session.uld,
          data: result
        });
      });
  } else {
    res.redirect("/login/customer");
  }
});



router.post("/form", function(req, res) {
  console.log(req.body);
  res.render("form", {
    name: req.session.fname,
    id: req.body.booking,
    fare: req.body.fare,
    pickupaddress: req.body.pickupaddress,
    deliveryaddress: req.body.deliveryaddress
  });
});

var id;
router.post("/parceldetails", function(req, res) {
  var myobj = {
    Clientname: req.body.Clientname,
    orderitem:req.body.orderitem,
    Fare: req.body.fare,
    addresseename: req.body.addresseename,
    mobilenumber: req.body.mobilenumber,
    ninjaid: req.body.ninjaid,
    pickupaddress: req.body.pickupaddress,
    deliveryaddress: req.body.deliveryaddress,
    locality: req.body.locality,
    City: req.body.City,
    Pincode: req.body.Pincode,
    status: "yet to be picked"
  };
  db.collection("parcel").insertOne(myobj, function(err, result) {
    if (err) {
      throw err;
    }
    id = result.insertedId;
    console.log(id);
   res.render("order", {
    orderid:id
  }); 
  });
  
});

router.get("/orders", function(req, res) {
  console.log(req.body);
  if (req.session.loggedIn) {
    db.collection("parcel")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
      });
  }
});

router.post("/update/:id",upload.single("photo"), async(req, res) => {
  
  const result = await cloudinary.uploader.upload(req.file.path, {
    width: 250,
    height: 250
  });
  console.log(result)
  console.log(req.body)
  db.collection("ninjaUser").updateOne(
    {_id: ObjectId(req.params.id)},
    { $set: { locality: req.body.locality, phonenumber: req.body.mobile, city:req.body.city, 
      password: req.body.pass, photo:result.secure_url,} },
    function(err, result) {
      if (err) throw err;
      res.redirect("/login/customer");
    }
  );
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login/customer");
});
module.exports = router;
