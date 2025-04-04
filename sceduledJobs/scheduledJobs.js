// const mongoose = require('mongoose');
// const { processSavedAwbsEmail } = require('../controllers/emailController');


// async function scheduleEmailTask() {
//     const users = await mongoose.model('User').find({}); // Getting all users via looping through
//     for (const user of users) {
//       await processSavedAwbsEmail(user._id);
//     }
//     setTimeout(scheduleEmailTask, 604800000 ); // number of milliseconds per week
//   }
  
// module.exports = {
//     scheduleEmailTask,
// }