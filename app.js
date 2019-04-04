//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let results = [];

function diceRoll(maxNum) {
  var result = Math.floor((Math.random() * maxNum) + 1);

  results.push(result);
}

app.get("/", function(req, res) {

  res.render("home", {
    results: results
  });
});

app.post("/", function(req, res) {
  const maxNum = req.body.dice;
  let numRolls = req.body.numRolls;

  while (numRolls > 0) {
    diceRoll(maxNum);
    numRolls--;
  }
  
  res.redirect("/");
});

app.post("/delete", function(req, res){
  results = [];

  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
