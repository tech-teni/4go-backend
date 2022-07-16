const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const authSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  salt: String,

  password: {
    type: String,
    required: true,
    // select: false,
    minlength: 4,
  },
  gender: {
    type: String,
    //required: true,
    enum: ["male", "female"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

authSchema.pre("save", function (next) {
  const user = this;
  if (user.password === "") {
    return "";
  }
  bcrypt.hash(user.password, 10, function (err, hash) {
    try {
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  });
});

const authModel = mongoose.model("authModel", authSchema);

module.exports = authModel;
