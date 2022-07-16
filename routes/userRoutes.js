const express = require("express");
const router = express.Router();
const {
  UserById,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticateToken } = require("../controllers/AuthControllers");

router.get("/users", authenticateToken, getAllUser);
// router.get("/user", authenticateToken, getOneUser);
router.get("/user", authenticateToken, getOneUser);
router.delete("/user", authenticateToken, deleteUser);

router.put("/user/", authenticateToken, updateUser);
router.param("id", authenticateToken, UserById);

//
module.exports = router;
