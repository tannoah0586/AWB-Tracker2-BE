const SavedAwb = require('../models/savedAwb');
const FreightData = require('../models/freightData');

async function saveAwb(req, res) {
  try {
    const userId = req.user._id;
    const awbId = req.body.awbId;

    const awb = await FreightData.findById(awbId);
    if (!awb) {
      return res.status(400).json({ err: 'Invalid AWB ID.' });
    }

    const existingSavedAwb = await SavedAwb.findOne({ userId: userId, awbId: awbId });
    if (existingSavedAwb) {
      return res.status(409).json({ err: 'AWB already saved by user.' });
    }

    const savedAwb = await SavedAwb.create({
      userId: userId, //Reference to Foreign key 
      awbId: awbId, // Reference to Foreign key
    });

    res.status(201).json(savedAwb);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function updateSavedAwb(req, res) {
  try {
    const { savedAwbId, newAwbId } = req.body;
    const userId = req.user._id;

    // Check if the savedAwb exists and belongs to the user
    const savedAwb = await SavedAwb.findOne({ _id: savedAwbId, userId: userId });
    if (!savedAwb) {
      return res.status(404).json({ err: 'Saved AWB not found or unauthorized.' });
    }

    // Check if the newAwbId is valid
    const newAwb = await Awb.findById(newAwbId);
    if (!newAwb) {
      return res.status(400).json({ err: 'Invalid new AWB ID.' });
    }

    // Update the savedAwb
    savedAwb.awbId = newAwbId;
    await savedAwb.save();

    res.status(200).json(savedAwb);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

module.exports = {
  saveAwb,
  updateSavedAwb,
};