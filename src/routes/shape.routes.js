const express = require('express');
const router = express.Router();
const Shape = require('../models/Shape.model');
const cloudinary = require('cloudinary').v2;

router.post('/', async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.file, {
            folder: 'shapes',
            resource_type: 'image',
        });
        const shape = new Shape({
            name: req.body.name || 'Custom Shape',
            url: result.secure_url,
            points: req.body.points || [],
        });
        await shape.save();
        res.status(201).json(shape);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const shapes = await Shape.find();
        res.status(200).json(shapes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;