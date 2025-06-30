const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'teacher', 'student'], 
        default: 'student' 
    },
    
    isActive: { type: Boolean, default: true }
},
{
    timestamps: true // This will add createdAt and updatedAt timestamps
}
);

module.exports = mongoose.model('User', userSchema);