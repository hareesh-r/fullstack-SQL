const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "pappu",
});


app.get("/products", (req, res) => {

  const category = req.query.category;

  db.query("SELECT * FROM products WHERE category = ?", [category], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/users", (req, res) => {
  const user = req.query.username;
  const pass = req.query.passwords;
 
  db.query("SELECT * FROM users WHERE username = ? AND passwords = ? ", [user, pass], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/category", (req, res) => {

  db.query("SELECT DISTINCT category FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.passwords;

  db.query(
    "INSERT INTO users (username,passwords) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Signup Successful");
      }
    }
  );
});

app.post("/add", (req, res) => {
  const category = req.body.category;
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;

  db.query(
    "INSERT INTO products (category,title,price,image) VALUES (?,?,?,?)",
    [category,title,price,image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Added successfully");
      }
    }
  );
});




app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
