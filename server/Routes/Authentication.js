const express = require("express");
const authRouter = express.Router();

const {
  register,
  login,
  currentUser,
  passwordless,
} = require("../Controllers/Authentication.js");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/current-user").get(currentUser);
authRouter.route("/passwordless").post(passwordless);

module.exports = authRouter;
