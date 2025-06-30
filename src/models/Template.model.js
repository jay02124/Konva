const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    elements: [
        {
            type: { type: String, enum: ['text', 'image', 'rect', 'circle', 'star', 'custom'], required: true },
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number },
            height: { type: Number },
            radius: { type: Number },
            points: [{ type: Number }], // For star/custom shapes
            text: { type: String },
            fontSize: { type: Number },
            fontFamily: { type: String, default: 'Arial' },
            fontStyle: { type: String, enum: ['normal', 'italic', 'bold', 'bold italic'], default: 'normal' },
            textAlign: { type: String, enum: ['left', 'center', 'right'], default: 'left' },
            fill: { type: String },
            stroke: { type: String },
            strokeWidth: { type: Number },
            rotation: { type: Number, default: 0 },
            opacity: { type: Number, default: 1 },
            shadowColor: { type: String },
            shadowBlur: { type: Number },
            shadowOffsetX: { type: Number },
            shadowOffsetY: { type: Number },
            draggable: { type: Boolean, default: true },
            dataField: { type: String },
            fillPatternImage: { type: String }, // Cloudinary URL
            fillPatternRepeat: { type: String, default: 'repeat' },
            shapeImage: { type: String }, // For image shapes (Cloudinary URL)
        },
    ],
    background: {
        color: { type: String, default: 'white' },
        image: { type: String }, // Cloudinary URL
    },
});

module.exports = mongoose.model('Template', templateSchema);