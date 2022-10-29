const express = require("express");
const router = express.Router();
const users = require("../../controller/user.product");
router.route("/").post(users.createNewUser);

module.exports = router;
