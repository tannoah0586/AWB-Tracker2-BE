const nodemailer = require('nodemailer');
const SavedAwb = require('../models/savedAwb');
const User = require('../models/user');
const FreightData = require('../models/freightData');



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

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savedAwbs = await SavedAwb.find({ userId: userId }).populate('awbId');

    if (savedAwbs.length === 0) {
      return res.status(404).json({ message: 'This user has no saved Awbs' });
    }

    let awbList = ''; // new string.. 
    for (const savedAwb of savedAwbs) {
      const hawbHbl = savedAwb.awbId['HAWB/HBL'];

      // Find the corresponding data in Frieghtdata (freightData collection)
      const freight = await FreightData.findOne({ 'HAWB/HBL': hawbHbl }); // Use FreightData model for referencing (mimic fetching from OTM server)

      if (freight && savedAwb.awbId['Proof Of Delivery (POD)'] === "") {
        awbList += `AWB ID: ${savedAwb.awbId._id}, HAWB/HBL: ${hawbHbl}, PODStatus: ${freight['Proof Of Delivery (POD)']}\n`;
      }
    }

    if (awbList.length > 0) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,  //retrieves user's email and sends them notification
        subject: 'Your Saved AWBs with POD Status',
        text: `Here are your saved AWBs with POD Status:\n${awbList}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Saved AWBs email sent:', info.messageId);
    } else {
      console.log('No AWBs found with empty POD and matching FreightData.');
    }

    res.status(200).json({ message: 'Saved AWBs email processed successfully.' });
  } catch (error) {
    console.error('Error sending saved AWBs email:', error);
    res.status(500).json({ error: 'Failed to send saved AWBs email.' });
  }
}

module.exports = {
  sendSavedAwbsEmail,
};
