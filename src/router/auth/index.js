const express = require("express");
const { authController } = require("../../controller/auth");
const authRouter = express.Router();
const { validateSingupBody } = require("../../validations/auth/signup");

authRouter.post("/login", validateSingupBody(), authController.loginController);

authRouter.post(
  "/signup",
  validateSingupBody(),
  authController.signupController
);

module.exports = authRouter;
