const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const MongoStore = require("connect-mongo");
var cookieParser = require("cookie-parser");

require("dotenv").config();
var session = require("express-session");
require("./Passport.js");

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
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

// console.log(mongoose.connection);
const dbString = process.env.MONGO_SRV;
const dbOptions = { useUnifiedTopology: true };
const connection = mongoose.createConnection(dbString, dbOptions);

// app.use(
//   session({
//     secret: "hello world",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://cafecafe:Cafe123@cluster0.jq8ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//       mongoOptions: { useUnifiedTopology: true },
//       collectionName: "sess",
//     }),
//     // store: sessionStore,
//     cookie: {
//       maxAge: 3 * 60 * 60 * 1000,
//     },
//   })
// );

//handling different Routes here
const PRODUCTS = require("./Routes/Products.js");
const AUTH = require("./Routes/Authentication.js");
const BLOG = require("./Routes/Blogs.js");
const CART = require("./Routes/Cart.js");
const COUPON = require("./Routes/Coupon.js");
const PAYMENT = require("./Routes/Payment.js");
const ORDER = require("./Routes/Order.js");
const MAIL = require("./Routes/Mailer.js");
const ADMIN = require("./Routes/Admin.js");
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
app.use("/api/v1", BLOG);
app.use("/api/v1", CART);
app.use("/api/v1", COUPON);
app.use("/api/v1", PAYMENT);
app.use("/api/v1", ORDER);
app.use("/api/v1", MAIL);
app.use("/api/v1", ADMIN);
module.exports = app;
