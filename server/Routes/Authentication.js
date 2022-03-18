const express = require("express");
const authRouter = express.Router();

const {
  register,
  login,
  currentUser,
  passwordless,
  changePassword,
  addPhone,
  generateOTP,
  verifyOTP,
  setPass,
} = require("../Controllers/Authentication.js");

const { isLoggedIn } = require("../Middlewares/isLoggedIn.js");

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/current-user").get(currentUser);
authRouter.route("/passwordless").post(passwordless);
authRouter.route("/update-password").post(isLoggedIn, changePassword);
authRouter.route("/add-phone").post(isLoggedIn, addPhone);

//for forgot password change
authRouter.route("/forgot-password/generate-otp").post(generateOTP);
authRouter.route("/forgot-password/verify-otp").post(verifyOTP);
authRouter.route("/forgot-password/set-pass").post(setPass);

module.exports = authRouter;
