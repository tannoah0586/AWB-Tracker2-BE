const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/sign-token', (req, res) => {
    // Mock user object added
    const user = {
      _id: 1,
      username: 'test',
      password: 'test',
    };
    const token = jwt.sign({ user }, process.env.JWT_SECRET)
    res.json({token})
  });
  

module.exports = router;

router.post('/verify-token', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Add in verify method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ decoded });
  } catch (err) {
    res.status(401).json({ err: 'Invalid token.' });
  }
});

  