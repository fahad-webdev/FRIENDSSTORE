const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware");
const controller = require("../controllers/userControllers");

router.route("/user/profile").get(verifyUser,controller.userProfile);

module.exports = router;