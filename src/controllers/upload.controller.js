const cloudinary = require('cloudinary').v2;
const Image = require('../models/Image.model');

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const file = req.file || (req.body.file && { path: req.body.file });
        if (!file) {
            return res.status(400).json({ message: 'No file provided' });
        }
        const result = await cloudinary.uploader.upload(file.path);
        const image = new Image({
            url: result.secure_url,
            name: (req.file && req.file.originalname) || 'Online Image',
        });
        await image.save();
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};