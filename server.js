// initialise dotenv
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");

const app = express();
const port = 5000;


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello, the bussy World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
