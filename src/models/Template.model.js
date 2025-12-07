const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    elements: [{
        type: { type: String, required: true },
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number },
        height: { type: Number },
        radius: { type: Number },
        innerRadius: { type: Number },
        outerRadius: { type: Number },
        points: [{ type: Number }],
        text: { type: String },
        fontSize: { type: Number },
        fontFamily: { type: String },
        fontStyle: { type: String },
        textAlign: { type: String },
        fill: { type: String },
        stroke: { type: String },
        strokeWidth: { type: Number },
        fillPatternImage: { type: String },
        fillPatternRepeat: { type: String },
        image: { type: String },
        shapeType: { type: String },
        shapePoints: [{ type: Number }],
        shapeImage: { type: String },
        draggable: { type: Boolean },
        rotation: { type: Number, default: 0 },
        opacity: { type: Number, default: 1 },
        shadowColor: { type: String },
        shadowBlur: { type: Number },
        shadowOffsetX: { type: Number },
        shadowOffsetY: { type: Number },
        dataField: { type: String },
    }],
    background: {
        color: { type: String, default: 'white' },
        image: { type: String },
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Template', templateSchema);