const nodemailer = require("nodemailer");

const sendOTPEmail = async (toEmail, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use another email service provider
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // Create HTML email template
    const emailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            /* Basic resets */
            body, html {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f4f7fc;
            }

            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            }

            .header {
              text-align: center;
              padding-bottom: 20px;
            }

            .header h1 {
              font-size: 28px;
              color: #333;
            }

            .message {
              text-align: center;
              color: #555;
              font-size: 16px;
              line-height: 1.5;
            }

            .verification-code {
              font-size: 24px;
              font-weight: bold;
              background-color: #2C8E4A;
              color: #ffffff;
              padding: 10px 20px;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
            }

            .cta-button {
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              display: inline-block;
              font-size: 16px;
              text-align: center;
              margin-top: 20px;
            }

            .footer {
              text-align: center;
              color: #777;
              font-size: 12px;
              margin-top: 30px;
            }

            .footer a {
              color: #4CAF50;
              text-decoration: none;
            }

            /* Responsive styles */
            @media (max-width: 600px) {
              .container {
                padding: 10px;
              }

              .header h1 {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>

          <div class="container">
            <div class="header">
              <h1>Welcome to University-Newshub!</h1>
            </div>

            <div class="message">
              <p>Thank you for registering with us. To complete your account setup, please verify your email address by entering the verification code below:</p>
              <div class="verification-code">
                ${otp}
              </div>
              <p>If you didn’t request this, please ignore this email.</p>

              <a href="[Verification Link]" class="cta-button">Verify My Email</a>
            </div>

            <div class="footer">
              <p>&copy; 2025 University-Newshub. All rights reserved.</p>
              <p>If you have any questions, feel free to <a href="mailto:mbot26902@gmail.com">contact us</a>.</p>
            </div>
          </div>

        </body>
        </html>
    `;

    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: 'Email Verification OTP',
        html: emailTemplate, // Set the email content to HTML
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
