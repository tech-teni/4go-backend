const mongoose = require("mongoose");
const authModel = require("../models/authModel");
const _ = require("lodash");
//
const UserById = (req, res, next, id) => {
  authModel.findById(id).exec((err, user) => {
    if (err) {
      res.status(400).json({ err: "user not found" });
    }
    res.send(user);
    req.profile = user; //add profile key or object to the req with user info
  });
  next();
};
//
const hasAuthorization = (req, res) => {
  const isAuthorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!isAuthorized) {
    return res.status(403).json({
      error: "user not authorized",
    });
  }
};
//

const getAllUser = (req, res, next) => {
  authModel.find((err, users) => {
    if (err) {
      return res.status(400).json({ err });
    }

    res.json({ users });
  });
  // .exclude("password");
};
const getOneUser = (req, res, next) => {
  if (req.profile) {
    return res.json(req.profile);
  }
  if (!req.auth && !req.profile) {
    return res.json({
      error: "user have no profile here, re-login",
    });
  }
  const { _id } = req.auth;
  authModel
    .find({ _id: _id }, (err, user) => {
      if (err) {
        return res.status(400).json({ err });
      }
      req.profile = user;
      return res.json({ user });
    })
    .select("_id firstName lastName userName email createdAt");
};

const updateUser = (req, res, next) => {
  if (req.profile) {
    let user = req.profile;
  }

  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err)
      return res.status(400).json({
        error: "you are not authorised",
      });
  });
};
const deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      res.json({ err });
    }
    res.json({ msg: user, note: " you have sucessfully deleted this user" });
  });
};

module.exports = {
  UserById,
  hasAuthorization,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
};
