const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const verify  = require("../middlewares/authMiddleware");
router.route("/").get(verify,controller.getCart);
router.route("/add").post(verify,controller.addToCart);
router.route("/update").put(verify,controller.updateToCart);
router.route("/remove").delete(verify,controller.removeItemFromCart);
router.route("/clear").put(verify,controller.clearCart);

module.exports = router;