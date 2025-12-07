const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    dob: { type: Date },
    class: { type: String },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);