const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser");

// app.use(bodyParser.json());
var db;
var conString = "mongodb://teamthrive:teamthrive123@ds044907.mlab.com:44907/thrive_signups"
/**
 * Models 
 */

var User = mongoose.model(
    "User", {
        firstName: String,
        lastName: String,
        email: String
    }
)

mongoose.connect(conString, (err, database) => {
    console.log("DB is connected");
    if(err) {
      console.error(err);
    }
    db = database;
    // saveData("deploy", "1", "2@3.com")
})

function saveData(fn, ln, em) {
  var userObject = {
      firstName: fn,
      lastName: ln,
      email: em
  }
  var user = new User(userObject);
  user.save();
}

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/api/contact', cors(), (req, res) => {
  console.log('Got a POST request!');
  var contact = req.body;
  var firstName = contact['firstname'];
  var lastName = contact['lastname']
  var email = contact['email'];

  saveData(firstName, lastName, email);
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Running on localhost:${port}`)
});


//Options
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });