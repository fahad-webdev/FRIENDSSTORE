const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");

router.route("/:userId").get(controller.getCart);
router.route("/add").post(controller.addToCart);
router.route("/remove").delete(controller.removeItemFromCart);
router.route("/clear").put(controller.clearCart);

module.exports = router;