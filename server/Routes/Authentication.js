const express = require("express");
const authRouter = express.Router();

const {
  register,
  login,
  currentUser,
  passwordless,
  changePassword,
} = require("../Controllers/Authentication.js");

const { isLoggedIn } = require("../Middlewares/isLoggedIn.js");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/current-user").get(currentUser);
authRouter.route("/passwordless").post(passwordless);
authRouter.route("/update-password").post(isLoggedIn, changePassword);

module.exports = authRouter;
