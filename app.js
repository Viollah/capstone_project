var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var login = require("./routes/login");
var signup = require("./routes/signup");
var track = require("./routes/track");
var clientdashboard = require("./routes/clientdashboard");
var ninjadashboard = require("./routes/ninjadashboard");
var messages = require("./routes/messages.js");
const { MongoDBNamespace, MongoClient } = require("mongodb");

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main", extname: ".handlebars" }));
app.set("view engine", "handlebars");

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
mongoose.connect('mongodb://localhost:27017/parcelninja')
.then(()=>console.log('connect to MongoDB...'))
.catch(err => console.error('it could not connect to mongoDB...'));

var MongoClient = require('mongodb').MongoClient,Server =require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost',27017));
mongoClient.open(function(err,mongoClient){
  var db1 = mongoClient.db("parcelninja");
  mongoClient.close();
});

app.use(
  session({
    secret: "Express session secret"
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/login", login);
app.use("/signup", signup);
app.use("/track", track);
app.use("/clientdashboard", clientdashboard);
app.use("/ninjadashboard", ninjadashboard);
app.use("/messages", messages);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/public/about.html");
});
app.get("/contact", function(req, res) {
  res.sendFile(__dirname + "/public/contact.html");
});
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