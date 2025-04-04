const nodemailer = require('nodemailer');
const SavedAwb = require('../models/savedAwb');
const User = require('../models/user');
const FreightData = require('../models/freightData');

async function setupNodemailer() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
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

async function sendEmailToUser(user, awbList) {
  const transporter = await setupNodemailer();
  if (!transporter) {
    console.error('Nodemailer setup failed.');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your Saved AWBs with at risk Status, please be aware',
      text: `Here are your saved AWBs with POD Status:\n${awbList}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Saved AWBs email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending saved AWBs email:', error);
  }
}

async function processSavedAwbsEmail(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found');
      return;
    }

    const savedAwbs = await SavedAwb.find({ userId: userId }).populate('awbId');

    if (savedAwbs.length === 0) {
      console.log('This user has no saved Awbs');
      return;
    }

    let awbList = '';
    for (const savedAwb of savedAwbs) {
      const hawbHbl = savedAwb.awbId['HAWB/HBL'];

      const freight = await FreightData.findOne({ 'HAWB/HBL': hawbHbl });

      if (freight && savedAwb.awbId['Proof Of Delivery (POD)'] === '') {
        const message = `AWB ID: ${savedAwb.awbId._id}, HAWB/HBL: ${hawbHbl}, PODStatus: ${freight['Proof Of Delivery (POD)']}\n`;
        awbList += message;
      }
    }

    if (awbList.length > 0) {
      await sendEmailToUser(user, awbList);
    } else {
      console.log('No AWBs found with empty POD and matching FreightData.');
    }
  } catch (error) {
    console.error('Error processing saved AWBs email:', error);
  }
}

module.exports = {
  processSavedAwbsEmail,
};