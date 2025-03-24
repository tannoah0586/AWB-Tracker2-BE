const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

//import Routes
const testJwtRouter = require('./controllers/test-jwt');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const awbRoutes = require('./routes/awbRoutes');
// const savedAwbRouter = require('./controllers/savedAwb');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Mount routes
app.use('/auth', authRoutes);
app.use('/users',userRoutes);
app.use('/test-jwt', testJwtRouter);
app.use('/awbs', awbRoutes);
// app.use('/savedAwb', savedAwbRouter)

app.listen(4000, () => {
  console.log('The express app is ready!');
});

