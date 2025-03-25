const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/saved-awbs', emailController.sendSavedAwbsEmail);

module.exports =router;