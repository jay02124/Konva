const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    dob: { type: String },
    photo: { type: String }, // Cloudinary URL
    class: { type: String },
});

module.exports = mongoose.model('Student', studentSchema);