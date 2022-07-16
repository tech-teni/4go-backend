const express = require("express");
const router = express.Router();
const { UserById } = require("../controllers/userController");
const { authenticateToken } = require("../controllers/AuthControllers");

// router.post("/", createPostController);
router.get("/", authenticateToken, (req, res) => {
  res.send("this is your profile page");
});

// params
router.param("userId", UserById);

module.exports = router;
