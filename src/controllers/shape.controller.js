const Shape = require('../models/Shape.model');
const cloudinary = require('cloudinary').v2;

exports.getAllShapes = async (req, res) => {
    try {
        const shapes = await Shape.find();
        res.json(shapes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createShape = async (req, res) => {
    try {
        const { name, points } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await cloudinary.uploader.upload(file.path);
        const shape = new Shape({
            name: name || file.originalname,
            url: result.secure_url,
            points: points ? JSON.parse(points) : [],
        });
        await shape.save();
        res.status(201).json(shape);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteShape = async (req, res) => {
    try {
        const shape = await Shape.findByIdAndDelete(req.params.id);
        if (!shape) {
            return res.status(404).json({ message: 'Shape not found' });
        }
        res.json({ message: 'Shape deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};