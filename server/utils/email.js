// utils/email.js - Function to send emails
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

async function sendEmail(to, subject, message) {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html: message
    });
    console.log(`📧 Email sent to ${to}`);
}

module.exports = sendEmail;
