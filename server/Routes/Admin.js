const express = require("express");
const AdminRouter = express.Router();
const { loginAdmin, loginVerify } = require("../Controllers/Admin.js");
AdminRouter.route("/admin/login").post(loginAdmin);
AdminRouter.route("/admin/verify").get(loginVerify);

module.exports = AdminRouter;
