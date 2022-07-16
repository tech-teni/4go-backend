const authModel = require("../models/authModel");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

//for register
const createAuthController = async (req, res) => {
  // console.log(req);
  console.log("submitting to backend");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(200)
      .json({ error: errors.array().map((err) => err.msg)[0] });
  }
  const userExist = await authModel.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(403).json({ error: "email has been used" });
  }
  const userNameExist = await authModel.findOne({
    userName: req.body.userName,
  });
  if (userNameExist) {
    return res.status(403).json({ error: "USERNAME IS TAKEN" });
  }

  const { firstName, lastName, userName, email, password } = req.body;

  const user = {
    firstName,
    lastName,
    password,
    userName,
    email,
  };
  const newUser = new authModel(user);
  newUser.save().then((result) => {
    res.status(200).json({ message: "new user saved" });
  });
};

const getAuthContollers = (req, res) => {
  res.json({ hello: "world" });
};

// for login
const postLoginControllers = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await authModel
    .findOne({ email: email }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: "no user found, pls sign up " });
      }
      const validateUser = bcrypt.compare(
        password,
        user.password,
        (err, result) => {
          if (result === false) {
            console.log("the result is " + result);

            return res
              .status(401)
              .json({ error: "invalid password do not match" });
          }
          if (result === true) {
            console.log("the result is " + result);
            const token = jwt.sign(
              {
                _id: user._id,
              },
              process.env.JWT_SECRET
            );
            res.cookie("t", token, { expires: new Date(Date.now() + 900000) });

            const { _id, name, email } = user;
            return res.json({ token, user: { _id, email, name } });
          }
        }
      );
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};
const getLoginControllers = async (req, res) => {
  res.send("hello world");
};

//  authorizeRoute
const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;
  // const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
    console.log(err);

    if (err) return res.sendStatus(403);
    console.log("THIS IS THE USER" + auth);
    //  notice the auth have id property so we store it in req as a property
    // example
    /* {
        "_id": "62bb3c15c403750dbe2af761",
        "iat": 1656520303,
    }
    */
    req.auth = auth;

    next();
  });
};

const signOut = async (req, res) => {
  res.clearCookie("t", { path: "/logout" });
  res.json({ message: " signed out sucessfully " });
};

// const requireLogin = jwt({
//   secret: process.env.JWT_SECRET,
// });
//exporting
module.exports = {
  createAuthController,
  getAuthContollers,
  getLoginControllers,
  postLoginControllers,
  signOut,
  authenticateToken,
};
