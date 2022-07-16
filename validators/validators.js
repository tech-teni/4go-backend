const { check, validationResult, oneOf } = require("express-validator");
const authValidator = {
  email: [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("email not valid"),
  ],
  firstName: [
    check("firstName").notEmpty().withMessage("firstname is required"),
  ],
  lastName: [check("lastName").notEmpty().withMessage("lastname is required")],
  userName: [check("userName").notEmpty().withMessage("username is required")],
  password: [
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 4 })
      .withMessage("password should be length minimum of 4"),
  ],
};

// second validtion
const postValidator = [
  check("postContent")
    .notEmpty()
    .withMessage("post must not be empty")
    .isLength({ min: 4, max: 150 })
    .withMessage("post content must be between 4 to 150 characters"),
];

module.exports = {
  authValidator,
  postValidator,
};
