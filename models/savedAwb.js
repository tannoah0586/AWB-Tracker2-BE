const mongoose = require('mongoose');

const savedAwbSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // ref User Model
        required: true,
    },
    awbId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'FreightData', // ref FreightData Model
        required: true,
    },
}, { collection: 'savedAwb', timestamps: true })

module.exports = mongoose.model('SavedAwb' , savedAwbSchema);