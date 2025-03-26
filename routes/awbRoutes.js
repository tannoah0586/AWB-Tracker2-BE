const FreightData = require('../models/freightData.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    const filter = {}; // Initialize filter object

    // Add filter conditions based on query parameters
    if (req.query["Departure Port"]) {
      filter["Departure Port"] = req.query["Departure Port"];
    }

    if (req.query["Transport Mode"]) {
      filter["Transport Mode"] = req.query["Transport Mode"];
    }

    if (req.query["Proof Of Delivery (POD)"] === "empty") {
      filter["Proof Of Delivery (POD)"] = { $in: [null, ""] };
    }

    const skip = (page - 1) * limit;

    const allAwbs = await FreightData.find(filter).skip(skip).limit(limit);
    const totalAwbs = await FreightData.countDocuments(filter); // Get total count for pagination info

    res.status(200).json({
      awbs: allAwbs,
      page,
      limit,
      totalAwbs,
      totalPages: Math.ceil(totalAwbs / limit),
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.get('/:awbId', async (req,res) => {
    try {
        const foundAwb = await FreightData.findById(req.params.awbId);

        if(!foundAwb){
            throw new Error('Shipment not found.');
        }
        res.status(200).json(foundAwb);
    } catch (error) {
        if (res.statusCode === 404 ) {
            res.json({ err:error.message });
        } else {
            res.status(500).json({ err:error.message });
        }
    }
});

module.exports = router;