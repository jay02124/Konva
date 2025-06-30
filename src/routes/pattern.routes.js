const express = require('express');
const router = express.Router();
const Pattern = require('../models/Pattern.model');
const cloudinary = require('cloudinary').v2;

router.post('/', async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.file, {
            folder: 'patterns',
            resource_type: 'image',
        });
        const pattern = new Pattern({
            name: req.body.name || 'Pattern',
            url: result.secure_url,
        });
        await pattern.save();
        res.status(201).json(pattern);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const patterns = await Pattern.find();
        res.status(200).json(patterns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;