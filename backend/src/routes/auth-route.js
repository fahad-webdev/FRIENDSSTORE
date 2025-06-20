const express = require("express");
const router = express.Router(); //we use express router to create routes
const authControllers = require("../controllers/authController.js");
const authorizeAdmin = require("../middlewares/authorizationAdmin.js");
const verifyUser = require("../middlewares/authMiddleware.js");

router.route("/verify").get(verifyUser, (req, res) => {
  res.status(200).json({
    status: true,
    message: "User is verified",
    user: req.user,
  });
}); //for authentication

router.route("/login").post(authControllers.login);
router.route("/signup").post(authControllers.register);
router.route("/logout").post(authControllers.logout);
router
  .route("/users")
  .get(verifyUser, authorizeAdmin, authControllers.allUsers);
router
  .route("/delete-user/:id")
  .delete(verifyUser, authorizeAdmin, authControllers.deleteUser);

module.exports = router;
