const user = require("../Models/user.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendMail = require("../Utilities/Mailer.js");
const template = require("../Utilities/Templates/ForgotPassword.js");
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
      contact: user1?.contact ? user1.contact : "",
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
const generateOTP = async (req, res) => {
  const { email } = req.body;
  try {
    //1) check if a user exists or not
    const userThere = await user.findOne({ email });
    if (!userThere) {
      throw "No User Found";
    }
    //generate an OTP for the user
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    const timeAhead = Date.now() + 900000;
    //update the DB Now :
    //send a mail here
    let shallow = template;
    shallow = shallow.replace("FullName", userThere.username);
    shallow = shallow.replace("ACCOUNT_EMAIL", userThere.email);
    shallow = shallow.replace("OTP", random);
    //template is ready now, call the mailer.
    await sendMail(userThere.email, "Password Reset Token", shallow);

    const updatedOTP = await user.findOneAndUpdate(
      { email },
      { otpGenerated: random, otpValidUpto: new Date(timeAhead) },
      { new: true }
    );
    res.status(200).json("OTP Sent");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const verifyOTP = async (req, res) => {
  console.log(req.body);
  const { otp, email } = req.body;
  try {
    if (!otp || !email) {
      throw "Missing Values";
    }
    //get if possible
    const userExists = await user.findOne({ email, otpGenerated: otp });
    if (!userExists) {
      throw "Invalid OTP Entered! Please Try Again";
    }
    console.log(userExists);
    //check for the expiry time
    if (new Date() > new Date(userExists.otpValidUpto)) {
      throw "OTP has Expired! Please Generate a New OTP";
    }
    res.status(200).json("Proceed");
  } catch (error) {
    res.status(401).json(error);
  }
};
const setPass = async (req, res) => {
  const { email, pass } = req.body;
  try {
    if (!email || !pass) {
      throw "Missing Values";
    }
    const encrypted = await bcrypt.hash(pass, 12);
    console.log(encrypted);
    //update the database with new password, and remove the otp Details
    const updatedUser = await user.findOneAndUpdate(
      { email },
      { password: encrypted, $unset: { otpGenerated: 1, otpValidUpto: 1 } },
      { new: true }
    );
    res.status(201).json("Password Changed Successfully!");
  } catch (error) {
    res.status(400).json(error);
  }
};
const object = {
  register,
  login,
  currentUser,
  passwordless,
  changePassword,
  addPhone,
  generateOTP,
  verifyOTP,
  setPass,
};
module.exports = object;
