const cron = require('node-cron');
const User = require('../models/user');
const { sendSavedAwbsEmail } = require('../controllers/emailController');

cron.schedule('20 19 * * 1-5', async ()=> {
    console.log('Running scheduled job at 7.20 PM (Mon-Fri) at Singapore timezone...');
    try {
        const users = await User.find({});
        for (const user of users){
            await sendSavedAwbsEmail({ body: { userId: user._id } }, {
                status: () => ({ json: (message)=> console.log(message) }) 
            });
        }
        console.log('Schedule job completed')
    } catch (error) {
        console.error('Error during scheudled job:', error);
    }
}, {
    scheduled: true,
    timezone: "Singapore"
    
});

console.log('Cron job scheduled for 7.20pm (mon to fri).');