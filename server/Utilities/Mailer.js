const nodemailer = require("nodemailer");

const sendMail = async (to, subject, message) => {
  //CREATE A TRANSPORTER
  try {
    const transport = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Cafecart ☕ <business.cafecart@gmail.com>",
      to: to,
      subject: subject,
      text: message,
      html: message,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = sendMail;
