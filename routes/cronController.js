const express = require('express');
const app = express();
const cronController = require('./controllers/cronController');

app.post('/render-cron-trigger', cronController.runrenderCronJob);