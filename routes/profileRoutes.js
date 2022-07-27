const express = require("express");
const router = express.Router();
const { getOneUser } = require("../controllers/userController");
const { authenticateToken } = require("../controllers/AuthControllers");
const { UserById } = require("../controllers/userController");
const authModel = require("../models/authModel");
const mongoose = require("mongoose").set("debug", true);
const { stringify } = require("nodemon/lib/utils");
const { parse } = require("dotenv");
const { ObjectId } = mongoose.mongo;
// router.post("/", createPostController);
router.get("/", getOneUser);

//
router.post("/", async (req, res) => {
  console.log("i start here");

  const { email, id } = req.body;
  // console.log(user);
  console.log(email);
  console.log(id);
  console.log(req.body);

  console.log("i end here");

  const findProfile = authModel
    .find({ _id: id }, (err, user) => {
      if (err) {
        res.status(400).json({ err: "user not found" });
      }
      if (user) {
        console.log("user is " + user);
        req.profile = user; //add profile key or object to the req with user info
        return res.json({ user });
      }
    })
    .select("_id createdAt firstName lastName userName email");
  // .populate("followers", "-id userName")
  // .populate("following", "-id userName");
});

// params
router.param("userId", UserById);

module.exports = router;
