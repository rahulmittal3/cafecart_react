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
      name: byEmail.username,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const currentUser = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json("NO JWT! Unauthorised");
    }
    //we have the jwt now, lets verify first..
    const decodedToken = await promisify(jwt.verify)(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_STRING
    );
    if (!decodedToken.email) {
      return res.status(401).json("JWT Disturbed");
    }
    const user1 = await user.findOne({ email: decodedToken.email });
    return res.status(201).json({
      id: user1._id,
      jwt: req.headers.authorization.split(" ")[1],
      contactVerified: user1.contactVerified,
      name: user1.username,
      email: user1.email,
    });
  } catch (error) {
    return res.status(500).json(error);
  }

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
      name: result.username,
      email: result.email,
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

const changePassword = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.current || !req.body.current || !req.body.currentVerified) {
      throw "Incomplete Details Submitted";
    }
    if (req.body.current !== req.body.currentVerified) {
      throw "Passwords didn't match! Please Try Again";
    }
    //check, whether the previous password is same as that of the now or not
    console.log(req.user);
    const matched = await bcrypt.compare(req.body.previous, req.user.password);
    if (!matched) {
      throw "Current Password Not Verified! Please Try Again";
    }
    //otherwise, we can update the password an
    const hash = await bcrypt.hash(req.body.current, 12);
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      { password: hash },
      { new: true }
    );

    return res.status(201).json("Okay");
  } catch (error) {
    res.status(400).json(error);
  }
};
const addPhone = async (req, res) => {
  console.log("ADD PHONE  : ", req.body);
  try {
    const user1 = await user.findByIdAndUpdate(
      req.body._id,
      {
        contact: req.body.phone,
        contactVerified: true,
      },
      { new: true }
    );
    console.log(user1);
    return res.status(201).json({
      id: user1._id,
      jwt: req.headers.authorization.split(" ")[1],
      contactVerified: user1.contactVerified,
      name: user1.username,
      email: user1.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const object = {
  register,
  login,
  currentUser,
  passwordless,
  changePassword,
  addPhone,
};
module.exports = object;
