const nodemailer = require('nodemailer');
const SavedAwb = require('../models/savedAwb');
const User = require('../models/user');
const Awb = require('../models/awb');

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

// async function sendTestEmail(req, res) {
//   const transporter = await setupNodemailer();
//   if (!transporter) {
//     return res.status(500).json({ error: 'Nodemailer setup failed.' });
//   }

//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_ENDUSER, // Send to another email for testing
//       subject: 'Nodemailer Test',
//       text: 'This is a test email sent from Nodemailer.',
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Test email sent: %s', info.messageId);
//     res.status(200).json({ message: 'Test email sent successfully.' });
//   } catch (error) {
//     console.error('Error sending test email:', error);
//     res.status(500).json({ error: 'Failed to send test email.' });
//   }
// }

async function sendSavedAwbsEmail(req, res) {
  const transporter = await setupNodemailer();
  if (!transporter) {
    return res.status(500).json({ error: 'Nodemailer setup failed.' });
  }

  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    // Fetch saved AWBs for the user, and populate the awbId.
    const savedAwbs = await SavedAwb.find({ userId: userId }).populate('awbId');

    if (savedAwbs.length === 0) {
      return res.status(404).json({message: "This user has no saved Awbs"});
    }

    let awbList = '';
    for (const savedAwb of savedAwbs) {
      //format the awb data into a string.
      awbList += `AWB ID: ${savedAwb.awbId._id}, HAWB/HBL: ${savedAwb.awbId['HAWB/HBL']}, PODStatus: ${savedAwb.awbId['Proof Of Delivery (POD)']}\n`;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your Saved AWBs',
      text: `Here are your saved AWBs:\n${awbList}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Saved AWBs email sent:', info.messageId);
    res.status(200).json({ message: 'Saved AWBs email sent successfully.' });
  } catch (error) {
    console.error('Error sending saved AWBs email:', error);
    res.status(500).json({ error: 'Failed to send saved AWBs email.' });
  }
}

module.exports = {
  sendSavedAwbsEmail,
};
