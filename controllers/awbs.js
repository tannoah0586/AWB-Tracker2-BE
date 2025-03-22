const Awb = require('../models/awb.js');
const express = require('express');
const router = express.Router();
//READ - GET

router.get('/', async (req, res) => {
    try {
      const allAwbs = await Awb.find();
      console.log('AWB Data:', allAwbs); // Log the result
      res.status(200).json(allAwbs);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  });

module.exports = router;