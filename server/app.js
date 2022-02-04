const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_SRV, { useUnifiedTopology: true })
  .then((res) => console.log(`Database is Connected!`))
  .catch((err) => console.log(err));

//handling different Routes here
const PRODUCTS = require("./Routes/Products.js");
app.use("/api/v1", PRODUCTS);
module.exports = app;
