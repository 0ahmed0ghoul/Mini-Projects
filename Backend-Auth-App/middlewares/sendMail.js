const nodemailer = require('nodemailer')

// Create a reusable transporter object using the default SMTP transport
exports.transport = nodemailer.createTransport({
    service: 'gmail', // Using Gmail as the email service provider
    auth: {
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS, // Email address stored in environment variables
        pass: process.env.NODE_CODE_SENDING_EMAIL_PASSWORD // Email password stored securely in environment variables
    }
});
