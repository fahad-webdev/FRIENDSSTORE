const express = require("express");
const router = express.Router();
const controllers = require("../controllers/wishlistControllers");
const verifyUser = require("../middlewares/authMiddleware");

router.route("/").get(verifyUser,controllers.getAllWishlist);
router.route("/add").post(verifyUser,controllers.addToWishlist);
router.route("/remove").post(verifyUser, controllers.removeWishlist);
router.route("/clear").delete(verifyUser,controllers.clearWishlist);

module.exports = router;