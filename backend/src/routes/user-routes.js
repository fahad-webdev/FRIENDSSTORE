const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/authMiddleware");
const controller = require("../controllers/userControllers");

router.route("/user/profile").get(verifyUser,controller.userProfile);
router.route("/user/profile/edit").put(verifyUser,controller.updateUserProfile);

module.exports = router;