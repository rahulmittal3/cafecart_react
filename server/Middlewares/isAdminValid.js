const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const isAdminValid = async (req, res, next) => {
  //1st comes here because
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_STRING
    );
    console.log(decodedToken);
    if (!decodedToken.email || decodedToken.email !== process.env.ADMIN_USER) {
      return res.status(401).json("Unauthorised Access");
    }
    if (new Date() > new Date(decodedToken.exp * 1000)) {
      return res.status(401).json("JWT Expired!");
    }
    next();
  } catch (error) {
    return res.status(401).json("UNAUTHORIZED");
  }
};
const object = { isAdminValid };
module.exports = object;
