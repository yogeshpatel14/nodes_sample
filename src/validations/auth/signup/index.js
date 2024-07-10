const { body } = require("express-validator");

const validateSingupBody = () => {
  return [
    body("userName", "user name should not be empty").notEmpty(),
    body("password", "password should not be empty").notEmpty(),
  ];
};

module.exports = {
  validateSingupBody,
};
