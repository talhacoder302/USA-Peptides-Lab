const Contact = require(`${__models}/contact`);
const { responseHandler } = require(`${__utils}/responseHandler`);
const sendEmail = require(`${__utils}/sendEmail`);
const { sendContactMessageEmail } = require(`${__utils}/sendEmailTemp.js`);
const { connectToDatabase, disconnectFromDatabase, startIdleTimer, } = require(`${__config}/dbConn`);

exports.contactUs = async (req, res) => {
  try {
    await connectToDatabase();
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return responseHandler.validationError(res, "All Fields required");
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    await sendContactMessageEmail({ name, email, subject, message });

    return responseHandler.success(res, contact, "Message sent successfully and saved in database");
  } catch (error) {
    return responseHandler.error(res, error.message);
  }
};
