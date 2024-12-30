const mongoose = require('mongoose');

const mushroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: 'So mia come\'l se ciama'
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    discoveredBy: {
        type: String,
        required: false,
        default: ''
    }
}, { timestamps: true });

const Mushroom = mongoose.model('Mushroom', mushroomSchema);

module.exports = Mushroom;