const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require("../middleware/verify-token");

router.get('/', verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;