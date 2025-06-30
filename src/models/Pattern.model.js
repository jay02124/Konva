const mongoose = require('mongoose');

const patternSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }, // Cloudinary URL
});

module.exports = mongoose.model('Pattern', patternSchema);