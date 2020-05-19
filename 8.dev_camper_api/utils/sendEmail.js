const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: proccess.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options,
    subject: options.subject,
    text: options.message
  };

  const info = await transport.sendEmail(message);

  console.log("Message sent: %s", info.messageId);
}
module.exports = sendEmail;