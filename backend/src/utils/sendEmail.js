// import sgMail from '@sendgrid/mail';
const sgMail = require("@sendgrid/mail");
// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email with dynamic data
const sendEmail = async ({ to, subject, text, html, attachments }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    text,
    html,
    attachments,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
    return response;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    if (error.response) {
      console.error("Error response:", error.response.body);
    }
    throw error;
  }
};

module.exports = sendEmail;
