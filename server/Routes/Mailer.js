const express = require("express");
const MailRouter = express.Router();

const { sendAboutUsMail } = require("../Controllers/Mailer.js");

MailRouter.route("/mail/about-us").post(sendAboutUsMail);

module.exports = MailRouter;
