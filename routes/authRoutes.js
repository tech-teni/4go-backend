const express = require("express");
const { authValidator } = require("../validators/validators");
const { UserById } = require("../controllers/userController");
const cookieParser = require("cookie-parser");

const {
  createAuthController,
  getAuthContollers,
  getLoginControllers,
  postLoginControllers,
  signOut,
} = require("../controllers/AuthControllers");

const router = express.Router();

router.post(
  "/register",
  authValidator.email,
  authValidator.firstName,
  authValidator.lastName,
  authValidator.userName,
  authValidator.password,
  createAuthController
);
router.get("/register", getAuthContollers);

router.post("/login", postLoginControllers);
router.get("/login", getLoginControllers);
router.get("/logout", signOut);

// params
router.param("userId", UserById);

module.exports = router;
