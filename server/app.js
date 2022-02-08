const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();
require("./Passport.js");

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "cafecart",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_SRV, { useUnifiedTopology: true })
  .then((res) => console.log(`Database is Connected!`))
  .catch((err) => console.log(err));

//handling different Routes here
const PRODUCTS = require("./Routes/Products.js");
const AUTH = require("./Routes/Authentication.js");
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/user/profile");
  }
);
app.use("/api/v1", PRODUCTS);
app.use("/api/v1", AUTH);
module.exports = app;
