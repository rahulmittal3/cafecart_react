const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json("Incomplete Details");
    }
    if (email !== process.env.ADMIN_USER) {
      return res.status(400).json("Email not Valid");
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json("Incorrect Password! Please Try Again");
    }

    //lets do one thing, lets create a jwt token
    const jwtCreated = await jwt.sign(
      { email: email },
      process.env.JWT_STRING,
      {
        expiresIn: 3 * 60 * 60,
      }
    );
    res.status(200).json(jwtCreated);
  } catch (error) {
    res.status(400).json("Error Logging You in! Please Try Again");
  }
};
const loginVerify = async (req, res) => {
  try {
    if (jwt.length < 5) {
      return res.status(401).json("JWT too short for Token");
    }
    const decodedToken = await promisify(jwt.verify)(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_STRING
    );
    console.log(decodedToken);
    if (!decodedToken.email || decodedToken.email !== process.env.ADMIN_USER) {
      return res.status(401).json("Unauthorised Access");
    }
    // console.log(new Date(decodedToken.iat * 1000));
    // console.log(new Date());
    // console.log(new Date(decodedToken.exp * 1000));
    if (new Date() > new Date(decodedToken.exp * 1000)) {
      return res.status(401).json("JWT Expired!");
    }

    //otherwise the user is valid one.
    return res.status(200).json("OK");
    //decode jwt token
  } catch (error) {
    return res.status(400).json("Unexpected Error");
  }
};
const obj = { loginAdmin, loginVerify };
module.exports = obj;
