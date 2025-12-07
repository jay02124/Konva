const Pattern = require('../models/Pattern.model');
const cloudinary = require('cloudinary').v2;

exports.getAllPatterns = async (req, res) => {
    try {
        const patterns = await Pattern.find();
        res.json(patterns);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createPattern = async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await cloudinary.uploader.upload(file.path);
        const pattern = new Pattern({
            name: name || file.originalname,
            url: result.secure_url,
        });
        await pattern.save();
        res.status(201).json(pattern);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deletePattern = async (req, res) => {
    try {
        const pattern = await Pattern.findByIdAndDelete(req.params.id);
        if (!pattern) {
            return res.status(404).json({ message: 'Pattern not found' });
        }
        res.json({ message: 'Pattern deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};