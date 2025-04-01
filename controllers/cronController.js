const User = require('../models/user');
const { sendSavedAwbsEmail } = require('./emailController');

async function runEasyCronJob(req,res) {
    console.log("render Cron trigger received");
    try {
        const users = await User.find({});
        for (const user of users) {
            await sendSavedAwbsEmail({ body: { userId: user._id } }, {
                status: () => ({ json: (message) => console.log(message) })
            });
        }
        res.status(200).json({ message: 'Cron Job executed successfully.' });
    } catch (error) {
        console.error('Error in Render Cron trigger:', error);
        res.status(500).json({ error: 'Cron job execution failed.'})
    }

};

module.exports = {
    runEasyCronJob,    
};