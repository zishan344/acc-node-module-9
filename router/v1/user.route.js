const express = require("express");
const router = express.Router();
const users = require("../../controller/user.product");
const verifyToken = require("../../middleware/verifyToken");
router.route("/signup").post(users.createNewUser);
router.route("/login").post(users.loginUser);
router.route("/login").post(users.loginUser);
router.route("/me").get(verifyToken, users.getMe);

module.exports = router;
