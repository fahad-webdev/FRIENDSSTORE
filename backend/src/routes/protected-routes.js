const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware.js");
const userProfile = require("../controllers/userController.js");

router.route("/me").get(verifyUser,userProfile);

module.exports = router;