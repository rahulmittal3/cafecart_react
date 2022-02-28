const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const { promisify } = require("util");
const isLoggedIn = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.startsWith("Bearer") === false
    ) {
      return res.status(401).json("Unauthorised Access");
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_STRING
    );

    if (!decodedToken.email) {
      return res.status(401).json("Unauthorised Access");
    }
    //check whether the user exists or Not
    const rem = await User.findOne({ email: decodedToken.email });
    if (!rem) {
      return res.status(401).json("Unauthorised Access");
    }
    req.user = rem;
    // if (new Date() > new Date(decodedToken.exp * 1000)) {
    //   return res.status(401).json("JWT Expired!");
    // }
    next();
  } catch (error) {
    return res.status(401).json("UNAUTHORIZED");
  }
};
const object = { isLoggedIn };
module.exports = object;
