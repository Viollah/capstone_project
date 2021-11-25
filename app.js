var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var flash = require('express-flash');

const uuid = require('uuid-random');
const OrderId = require('./order');


let orderId = OrderId(uuid());
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const { urlencoded, json } = require('body-parser');

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main", extname: ".handlebars" }));
app.set("view engine", "handlebars");

app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 } }));

app.use(urlencoded({ extended: false }))
// parse application/
app.use(json());
app.use(flash());

open({
  filename: './parceldelivery.db',
  driver: sqlite3.Database
}).then(async function (db) {
  // run migrations
  await db.migrate();
  // only setup the routes once the database connection has been established

  app.get("/", async function (req, res) {
    let allUsers = await db.all('select * from user');
    res.render('home');
  });

  app.get("/login/customer", function (req, res) {
    res.render('login-customer');
  });



  app.post("/login/authcustomer", async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let user = await db.all("select * from user where email = ? and password = ?", email, password);
    res.redirect('clientdashboard');
  });

  app.get("/login/clientdashboard", async function (req, res) {
    let drivers = await db.all("select * from drivers");
    let orders = await db.all("select * from package_details");
    res.render('clientdashboard', {
      data: orders,
      drivers: drivers
    });
  });

  app.get("/login/ninja", function (req, res) {
    res.render('login-ninja');
  });

  app.post("/login/auth", async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let user = await db.all("select * from user where email = ? and password = ?", email, password);
    res.redirect('ninjadashboard');
  });

  app.get("/login/ninjadashboard", async function (req, res) {
    let drivers = await db.all("select * from drivers");
    res.render('ninjadashboard', {
      data: drivers
    });
  });

  app.get("/signup", function (req, res) {
    res.render('signup');
  });


  app.post("/signup", async function (req, res) {

    console.log(req.session.firstName, req.session.lastName, req.session.email, req.session.password);
    let insertData = ('INSERT INTO user (firstName, lastName, email, password)  VALUES (?, ?, ?, ?)');
    await db.run(insertData, req.session.firstName, req.session.lastName, req.session.email, req.session.password);

    res.redirect('/login/customer');
  });
  app.get("/signup/signupninja", function (req, res) {
    res.render('signupninja');
  });

  app.post("/signup/ninja", async function (req, res) {

    console.log(req.session.firstName, req.session.lastName, req.session.email, req.session.password);
    let insertData = ('INSERT INTO USER (firstName,lastName,email,password)  VALUES (?,?,?,?)');
    await db.run(insertData, req.session.firstName, req.session.lastName, req.session.email, req.session.password);

    res.redirect('/login/ninja');
  });

  app.get("/about", function (req, res) {
    res.render('about');
  });

  app.get("/contact", function (req, res) {
    res.render('contact');
  });

  app.get("./", function (req, res) {
    res.render('order');
  });

  //  app.post("/clientdashboard/form", async function (req, res) {
  //     res.redirect('form');

  //   });

  // app.get("/clientdashboard/form", function (req, res) {
  //   res.render('form');
  // });

  app.get("/ninjadashboard/orders", async function (req, res) {
    let package_details = await db.all("select * from package_details");
    res.render('ninjaorder', {
      data: package_details
    });
  });

  // app.get("/ninjadashboard/", function (req, res) {
  //   res.render('/login/ninjadashboard');
  // });

  app.post("/ninjadashboard/update/", async function (req, res) {
    res.redirect('/login/ninjadashboard');
  });

  app.get("/clientdashboard/parceldetails", async function (req, res) {
    console.log(orderId.getOrderId())
    res.render('order', {
      orderId: orderId.getOrderId()
    });
  });

  app.get("/clientdashboard/", function (req, res) {

    res.redirect('/login/clientdashboard');
  });

  app.get("/clientdashboard/logout", function (req, res) {
    res.render('login-customer');
  });

  app.get("/ninjadashboard/logout", function (req, res) {
    res.render('login-ninja');
  });

  app.post("/book", async function (req, res) {
    const {
      username,
      item_to_be_delivered,
      mobile_number, city,
      pincode,
      pickupaddress,
      deliveryaddress,
      fare,
      address_locality,
      driver_id
    } = req.body;
    await db
      .run("insert into package_details (sendername, item, fare, address_locality, city, pincode, order_id ,phonenumber, pick_up_address, drop_off_address, driver_id) values (?,?,?,?,?,?,?,?,?,?,?)"
        , username, item_to_be_delivered, fare, address_locality, city, pincode, orderId.getOrderId(), mobile_number, pickupaddress, deliveryaddress, Number(driver_id));
    res.redirect('/clientdashboard/parceldetails');
    let checkIfDataWasAdded = await db.all("select * from package_details where sendername = ?", username);
    console.log(checkIfDataWasAdded)
  });

  app.get("/track/package/:orderId?", async function (req, res) {

    console.log(req.params.orderId)
    let trackOrder = await db.all("select * from package_details where order_id = ?", req.params.orderId);
    let orders = await db.all("select * from package_details");
    console.log(trackOrder);
    req.flash("info", trackOrder[0].status);
    res.json({
      order: trackOrder
    })
    // res.redirect("/");
  })

  app.post('/ninjadashboard/statusupdate', async function (req, res) {
    const { status, orderId } = req.body;
    console.log(req.body);
    await db.run('update package_details set status = ? where order_id = ?', status, orderId);
  });


});
app.get("/chatbot", function (req, res) {
  res.sendFile(__dirname + "/public/chatbot.html");
});




const PORT = process.env.PORT || 3013;
app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`)
});