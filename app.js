const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

var app = express();

app.use(cors());
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my_secret_password",
  port: 6033,
  database: "app_db",
});

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.post("/login", (req, res, next) => {
  const query =
    'SELECT name from users where email = "' +
    req.body.email +
    '" and password = "' +
    req.body.password +
    '";';

    console.log(query);
  con.query(query, function (err, result) {
    if (!err){
        console.log(result);
        if(result[0])res.json({name:result[0].name});
        else res.status(409).json("Error");
    }
    else res.status(409).json("Error");
  });
});

app.post("/register", (req, res, next) => {
    console.log(req.body);
  const query =
    'INSERT INTO `users` (`id`, `email`, `password`, `name`)VALUES (NULL, "' +
    req.body.email +
    '", "' +
    req.body.password +
    '", "' +
    req.body.name +
    '")';

  con.query(query, function (err, result) {
    if (!err) res.json("Ok");
    else res.status(409).json("Error");
  });
});

app.post("/send", (req, res, next) => {
const query = 'INSERT INTO `messages` (`id`, `user`, `message`) VALUES (NULL, "' +
req.body.name +
'", "' +
req.body.message +
'")';

con.query(query, function (err, result) {
    if (!err) res.json("Ok");
    else res.status(409).json("Error");
  });
});

app.get("/get", (req, res, next) => {
    const query =
    'SELECT * from messages';

    console.log(query);
  con.query(query, function (err, result) {
    if (!err){
        res.json(result);
    }
    else res.status(409).json("Error");
  });});
app.get("/health", (req, res, next) => {
  res.json("alive");
});
