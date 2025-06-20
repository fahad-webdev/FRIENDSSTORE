const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController.js");
const upload = require("../utils/multer.js"); //multer middleware to provide uploading image instance in uploads directory
const verifyUser = require("../middlewares/authMiddleware.js");
const authorizeAdmin = require("../middlewares/authorizationAdmin.js");

router
  .route("/products")
  .get(controller.getAllProducts);
router.post(
  "/add-product",
  verifyUser,
  authorizeAdmin,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  controller.addProduct
); // Accept up to 5 images
router
  .route("/products/:id")
  .get(controller.getProductById);
router.put(
  "/products/:id",
  verifyUser,
  authorizeAdmin,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  controller.updateProduct
);
router
  .route("/delete-product/:id")
  .delete(verifyUser, authorizeAdmin, controller.deleteProduct);

module.exports = router;
