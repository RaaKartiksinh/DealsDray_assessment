const express = require("express");
const home = express.Router();

home.get("/", (req, res) => {
  res.status(200).send({ message: "Server Start " });
});



module.exports = home;
