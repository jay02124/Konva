const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }, // Cloudinary URL
    points: [{ type: Number }], // For custom polygon shapes
});

module.exports = mongoose.model('Shape', shapeSchema);