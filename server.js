const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
// const port = process.env.PORT || 4000;
const port = 4000;
const testJwtRoutes = require('./routes/test-jwtRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const awbRoutes = require('./routes/awbRoutes');
const savedAwbRoutes = require('./routes/savedAwbRoutes');
const emailRoutes = require('./routes/emailRoutes');

// const cron = require('node-cron');
// cron.schedule('* * * * *', () => {   //testing 
//   console.log('Running a scehduled test at Singapore timezone every min')
// }, {
//   scheduled: true,
//   timezone: "Singapore"
// });



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

require('./cron/cronJobs');

// Mount routes
app.use('/auth', authRoutes);
app.use('/users',userRoutes);
app.use('/test-jwt', testJwtRoutes);
app.use('/awbs', awbRoutes);
app.use('/savedawbs', savedAwbRoutes);
app.use('/email', emailRoutes);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

