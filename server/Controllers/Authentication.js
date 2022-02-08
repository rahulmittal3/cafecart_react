const user = require("../Models/user.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const register = async (req, res) => {
  //get the validation first
  console.log(req.body);
  const { name, email, phone, password, confirmPassword } = req.body;
  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json("Fill in All the Fields");
  }
  if (password !== confirmPassword) {
    return res.status(500).json("Passwords Not Matched!");
  }

  //USER IS CORRECT NOW, SO JUST REGISTER THE USER
  const encrypted = await bcrypt.hash(password, 12);
  console.log(encrypted);

  const finalDate = {
    email: email,
    username: name,
    password: encrypted,
    contact: phone,
    contactVerified: true,
  };
  try {
    const exist = await user.findOne({ email: email });
    if (exist) {
      return res
        .status(504)
        .json("User Already Exists! Enter a unique email and mobile");
    }
    const query = new user(finalDate);
    const result = await query.save();
    console.log(result);
    res.status(201).json("New User Created");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //get the user database from email or password;
  try {
    const byEmail = await user.findOne({ email: email });
    console.log(byEmail);
    if (byEmail === null) {
      throw "Email Not Registered";
    }
    //if email exists, then check for pwd...
    const checkPwd = await bcrypt.compare(password, byEmail.password);
    // console.log(checkPwd);
    // console.log(byEmail.password, password);
    if (!checkPwd) {
      throw "Incorrect Password! Please Try Again";
    }
    //if we are here, it means username and pwd are correct. Authenticate the user with website
    //create a jwt also;
    const tokenCreated = await jwt.sign(
      { email: req.body.email },
      process.env.JWT_STRING
    );

    res.status(200).json({
      id: byEmail._id,
      jwt: tokenCreated,
      contactVerified: byEmail.contactVerified,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const currentUser = async (req, res) => {
  console.log(req.headers);
  res.json("got the headers");
  //get the id of the current user and loggedin...
  //first check the JWT_STRING
};
const passwordless = async (req, res) => {
  console.log(req.body);
  try {
    // 1) check whether user is registred or not
    const exist = await user.findOne({ email: req.body.email });
    if (exist) {
      //login the user
      const tokenCreated = await jwt.sign(
        { email: exist.email },
        process.env.JWT_STRING
      );
      return res.status(200).json({
        id: exist._id,
        jwt: tokenCreated,
        contactVerified: exist.contactVerified,
      });
    }
    //now create an UNVERIFIED Account of user...
    const finalObj = {
      username: req.body.name,
      email: req.body.email,
      password: "",
    };
    const query = new user(finalObj);
    const result = await query.save();

    //create a jwt
    const tokenCreated = await jwt.sign(
      { email: result.email },
      process.env.JWT_STRING
    );
    res.status(200).json({
      id: result._id,
      jwt: tokenCreated,
      contactVerified: result.contactVerified,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  //get the email as usual..
  // const { email } = req.body;
  // //get the user database from email or password;
  // try {
  //   const byEmail = await user.findOne({ email: email });
  //   console.log(byEmail);
  //   if (byEmail === null) {
  //     throw "Email Not Registered! Cannot Login";
  //   }

  //   //if we are here, it means username and pwd are correct. Authenticate the user with website
  //   //create a jwt also;
  //   const tokenCreated = await jwt.sign(
  //     { email: email },
  //     process.env.JWT_STRING
  //   );

  //   res.status(200).json({
  //     id: byEmail._id,
  //     jwt: tokenCreated,
  //     contactVerified: byEmail.contactVerified,
  //   });
};

const object = { register, login, currentUser, passwordless };
module.exports = object;
