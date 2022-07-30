const express = require("express");
const { check, validationResult } = require("express-validator");
const { authenticateToken } = require("../controllers/AuthControllers");
const router = express.Router();
const {
  addFollower,
  removeFollower,
  follow,
  unFollow,
} = require("../controllers/followController");
// router.post("/add",  createPostController);
// router.get("/remove", getPostController);

router.put("/add", addFollower);
router.put("/remove", removeFollower);
router.put("/follow", follow);
router.put("/unfollow", unFollow);

// params PostById

module.exports = router;
