const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// ✅ Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your MySQL password
  database: "recyclo_cart_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL Database ✅");
  }
});

// ✅ API to store order
app.post("/createOrder", (req, res) => {
  const { items, amount, paymentMethod } = req.body;

  const orderData = {
    items: JSON.stringify(items),
    amount,
    payment_method: paymentMethod,
    status: "SUCCESS", // Simulated as success
  };

  const query = "INSERT INTO orders SET ?";
  db.query(query, orderData, (err, result) => {
    if (err) {
      console.error("Error inserting order:", err);
      res.status(500).send("Database Error");
    } else {
      console.log("Order stored in DB ✅");
      res.json({ orderId: result.insertId });
    }
  });
});

// ✅ Success Page Redirect
app.get("/success", (req, res) => {
  res.redirect("/success.html");
});

// ✅ Failure Page Redirect
app.get("/failure", (req, res) => {
  res.redirect("/failure.html");
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
