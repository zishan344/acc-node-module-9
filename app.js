const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const brandRoute = require("./router/v1/brand.route");
//middleware
app.use(express.json());
app.use(cors());
// schema design
app.use("/api/v1/brand", brandRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
