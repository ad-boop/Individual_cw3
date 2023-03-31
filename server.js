// Requires the modules needed

var express = require("express");
var app = express();
var cors = require('cors')
var path = require("path");
var fs = require("fs");
const { MongoClient } = require("mongodb");

require("dotenv").config()


app.use(express.json());
app.use(cors());
const ConnectionString = process.env.CONNECTION_STRING;
const Port = process.env.PORT;
app.set('port', Port);



//logger middleware. Logs all the incoming requests
app.use(function(req, res, next) {
    console.log("In comes a " + req.method + " with Request IP: " + req.url);
    console.log("Request date: " + new Date());
    res.setHeader('Access-Control-Allow-Origin', '*');
    next(); //stops browser from hanging
})

// static file middlewear
app.use(function (req, res, next) {
  // Uses path.join to find the path where the file should be
  var filePath = path.join(__dirname, "static", req.url); //determines the file path
  // Built-in fs.stat gets info about a file
  fs.stat(filePath, function (err, fileInfo) {
    if (err) { //if error exists
      next();
      return;
    }

    if (fileInfo.isFile()) res.sendFile(filePath);
    else next();
  });
});

let db;
// MongoClient.connect(
//   "mongodb+srv://adora:1234@getting-started.i2rya2y.mongodb.net",
//   (err, client) => {
//     db = client.db("schoolPlanner");
//   }
// );

MongoClient.connect(ConnectionString, (err, client) => {
  db = client.db("schoolPlanner");
  });


app.get('/', (req, res, next) => {
  res.send('Select a collection, e.g., /collectionName');
  return next();
});

app.param("collectionName", (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName);
  return next();
});

// get route to retreive all the objects from the collection
app.get("/collection/:collectionName", (req, res, next) => {
  // find the data from the mongodb
  // toArray to get the actual results
  req.collection.find({}).toArray((e, results) => {
    if (e) return next(e);
    res.json(results);
  });
});


//If an image does not exist in the static folder, the error message is displayed.
// last middlewear
app.use(function(req, res){
  // sends if error of status code 404
  res.status(404).send("File not Found! try again...");
});   

//deploying the server
// getting port number from heroku
// const port = process.env.PORT || 3000;
app.listen(Port, () => {
console.log("Server running...");
});

