const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//import files
const db = require("./db");
const router = require("./Create-api/Router/UserRouter");
app.use(router);

//Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stacktrace: err.stack,
  });
  next();
});

app.listen(5000, (error) => {
  console.log("Server Created Successfully");
});
