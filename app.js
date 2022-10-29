const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const brandRoute = require("./router/v1/brand.route");
const categoryRoute = require("./router/v1/category.route");
const storeRoute = require("./router/v1/store.route");
const productRoute = require("./router/v1/product.route");
const supplierRoute = require("./router/v1/supplier.route");
const stockRoute = require("./router/v1/stock.route");
const userRoute = require("./router/v1/user.route");
//middleware
app.use(express.json());
app.use(cors());
// schema design
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
