// controllers/emailController.js
const nodemailer = require('nodemailer');

async function setupNodemailer() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log('Nodemailer transporter is ready.');
    return transporter;
  } catch (error) {
    console.error('Error setting up Nodemailer:', error);
    return null;
  }
}

async function sendTestEmail(req, res) {
  const transporter = await setupNodemailer();
  if (!transporter) {
    return res.status(500).json({ error: 'Nodemailer setup failed.' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Nodemailer Test',
      text: 'This is a test email sent from Nodemailer.',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent:', info.messageId);
    res.status(200).json({ message: 'Test email sent successfully.' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email.' });
  }
}

module.exports = {
  sendTestEmail,
};