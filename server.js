const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const port = process.env.PORT || 8080;
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Database connected successfully".blue.bold);
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
