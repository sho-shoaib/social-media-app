const express = require("express");
const userController = require("../controllers/userController.js");
const authController = require("../controllers/authController.js");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

module.exports = router;
