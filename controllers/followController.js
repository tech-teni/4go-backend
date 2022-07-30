const authModel = require("../models/authModel");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
require("dotenv").config();

const addFollower = (req, res) => {
  const { id } = req.body;
  authModel.following.push({});

  console.log("addFollower");
};

const removeFollower = (req, res) => {
  console.log("removeFollower");
};

const follow = (req, res) => {
  console.log("follow");
};
const unFollow = (req, res) => {
  console.log("unFollow");
};
module.exports = { addFollower, removeFollower, follow, unFollow };
