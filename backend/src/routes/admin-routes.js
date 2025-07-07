const express =require("express");
const router = express.Router();
const controller = require("../controllers/adminControllers");
const verifyUser = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authorizationAdmin");

router.route("/users").get(verifyUser,authMiddleware,controller.allUsers);
router.route("/users").post(verifyUser,authMiddleware,controller.createUser);
router.route("/users/:id").delete(verifyUser,authMiddleware,controller.deleteUser);

module.exports = router;