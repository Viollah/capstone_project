var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
// const bcrypt = require('bcrypt');
// var ssn;


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

open({
  filename: './parceldelivery.db',
  driver: sqlite3.Database
}).then(async function (db){
// run migrations
  await db.migrate();
  // only setup the routes once the database connection has been established




  app.get("/", function(req, res){
    res.render('home');
  });

  app.get("/login/customer", function(req, res){
    res.render('login-customer');
  });

 

  app.post("/login/authcustomer",async function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    let user =  await db.all("select * from user where email = ? and password = ?",email,password);
    res.redirect('clientdashboard');
  });

  app.get("/login/clientdashboard", function(req, res){
    res.render('clientdashboard');
  });

  app.get("/login/ninja", function(req, res){
    res.render('login-ninja');
  });

  app.post("/login/auth",async function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    let user =  await db.all("select * from user where email = ? and password = ?",email,password);
    res.redirect('ninjadashboard');
  });

  app.get("/login/ninjadashboard", function(req, res){
    res.render('ninjadashboard');
  });


  app.get("/signup", function(req, res){
    res.render('signup');
  });

 

app.post("/signup",async function(req, res){

    console.log(req.session.firstName, req.session.lastName, req.session.email, req.session.password);
    let insertData = ('INSERT INTO USER (firstName,lastName,email,password)  VALUES (?,?,?,?)');
    await db.run(insertData, req.session.firstName, req.session.lastName, req.session.email, req.session.password);
    
    res.redirect('/login/customer');
  });
  app.get("/signup/signupninja", function(req, res){
    res.render('signupninja');
  });

  app.post("/signup/ninja",async function(req, res){

    console.log(req.session.firstName, req.session.lastName, req.session.email, req.session.password);
    let insertData = ('INSERT INTO USER (firstName,lastName,email,password)  VALUES (?,?,?,?)');
    await db.run(insertData, req.session.firstName, req.session.lastName, req.session.email, req.session.password);
    
    res.redirect('/login/ninja');
  });

  app.get("/about", function(req, res){
    res.render('about');
  });

  app.get("/contact", function(req, res){
    res.render('contact');
  });

  app.get("./", function(req, res){
    res.render('order');
  });

  app.get("/ninjadashboard/orders", function(req, res){
    res.render('ninjaorder');
  });

  app.get("/ninjadashboard/", function(req, res){
    res.render('ninjadashboard');
  });
  

  app.post("/ninjadashboard/statusupdate/",async function(req, res){
    res.redirect('ninjaorder');
  });

  app.post("/clientdashboard/parceldetails",async function(req,res){
    res.render('');
  });

  app.get("/clientdashboard/logout", function(req, res){
    res.render('login-customer');
  });

});


const PORT = process.env.PORT || 3013;
app.listen(PORT,function(){
  console.log(`App started on port ${PORT}`)
});