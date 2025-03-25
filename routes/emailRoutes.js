const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/test-email', emailController.sendTestEmail);

module.exports =router;