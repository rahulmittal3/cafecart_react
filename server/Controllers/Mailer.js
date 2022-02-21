const aboutUsMail = require("../Utilities/Templates/AboutUsMail.js");
const sendMail = require("../Utilities/Mailer.js");
const sendAboutUsMail = async (req, res) => {
  console.log(req.body);
  //create a shallow copy of mail object
  let mail = aboutUsMail;
  mail = mail.replace("{{SENDER_NAME}}", `${req.body.fName} ${req.body.lName}`);
  mail = mail.replace("{{SENDER_NAME}}", `${req.body.fName} ${req.body.lName}`);
  mail = mail.replace("{{SENDER_EMAIL}}", `${req.body.email}`);
  mail = mail.replace("{{SENDER_CONTACT}}", `${req.body.phone}`);
  mail = mail.replace("{{SENDER_MESSAGE}}", `${req.body.message}`);

  //mail is created with
  try {
    const result = await sendMail(
      "business.cafecart@gmail.com",
      `You Got A Message from ${req.body.fName} ${req.body.lName}`,
      mail
    );
    console.log(result);
    res
      .status(201)
      .json(
        "An Email has been sent to Cafecart! The Team will Reach out to you soon!"
      );
  } catch (error) {
    res.status(400).json("Email could not be sent. Please Try Again");
  }
};
const obj = { sendAboutUsMail };
module.exports = obj;
