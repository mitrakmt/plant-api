const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = ({ email, text, subject }) => {
  const emailToSend = {
    to: email,
    from: "michael@plantlyfe.com",
    subject,
    text
  };

  sgMail.send(emailToSend);
};

module.exports = { sendEmail };
