const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: 'Unknown Tree'
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: false,
        default: 'Unknown Size'
    },
    description: {
        type: String,
        required: false,
        default: 'No description provided'
    },
    discoveredBy: {
        type: String,
        required: false,
        default: 'Anonymous'
    }
}, { timestamps: true });

const Tree = mongoose.model('Tree', treeSchema);

module.exports = Tree;