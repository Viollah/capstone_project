var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var login = require("./routes/login");
var signup = require("./routes/signup");
var track = require("./routes/track");
var clientdashboard = require("./routes/clientdashboard");
var ninjadashboard = require("./routes/ninjadashboard");
var messages = require("./routes/messages.js");
// const { MongoDBNamespace, MongoClient } = require("mongodb");

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const { urlencoded, json } = require('body-parser');

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main", extname: ".handlebars" }));
app.set("view engine", "handlebars");

app.use(express.static('public'));

app.use(urlencoded({ extended: false }))
// parse application/
app.use(json()); 


open({
  filename: './parcelninja.db',
  driver: sqlite3.Database
}).then(async function (db) {
// run migrations
  await db.migrate();
  // only setup the routes once the database connection has been established

  app.get("/", function(req, res) {
    res.render('home');
  });

  app.get("/login/customer", function(req, res) {
    res.render('login-customer');
  });

  app.post("/login/customer", function(req, res) {
    res.redirect('login-customer');
  });

  // app.post("/login/authcustomer",async function(req, res) {
  //   let email = req.body.email;
  //   let password = req.body.password;
  //   let user =  await db.all("select * from user where email = ? and password = ?",email,password);
  //   res.redirect('/');
  // });

  
  app.get("/about", function(req, res) {
    res.sendFile(__dirname + "/public/about.html");
  });
  app.get("/contact", function(req, res) {
    res.sendFile(__dirname + "/public/contact.html");
  });
});

// var db;
// var mongoclient = require("mongodb").MongoClient;
// mongoclient.connect(
//   "mongodb://localhost:27017",
//   { useNewUrlParser: true },
//   function(err, client) {
//     if (err) throw err;
//     db = client.db("parcelninja");
//   } 
// );
// mongoose.connect('mongodb://localhost:27017/parcelninja')
// .then(()=>console.log('connect to MongoDB...'))
// .catch(err => console.error('it could not connect to mongoDB...'));

// var MongoClient = require('mongodb').MongoClient,Server =require('mongodb').Server;

// var mongoClient = new MongoClient(new Server('localhost',27017));
// mongoClient.open(function(err,mongoClient){
//   var db1 = mongoClient.db("parcelninja");
//   mongoClient.close();
// });



app.use(
  session({
    secret: "Express session secret"
  })
);
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));
// app.use("/login", login);
// app.use("/signup", signup);
// app.use("/track", track);
// app.use("/clientdashboard", clientdashboard);
// app.use("/ninjadashboard", ninjadashboard);
// app.use("/messages", messages);




/* app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
}); */

// app.listen(3050, function() {
//   console.log("port is running!!!");
// });
const PORT = process.env.PORT || 3013;
app.listen(PORT,function(){
  console.log(`App started on port ${PORT}`)
});