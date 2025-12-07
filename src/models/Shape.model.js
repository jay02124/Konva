const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    points: [{ type: Number }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Shape', shapeSchema);