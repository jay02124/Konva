const express = require('express');
const router = express.Router();
const Template = require('../models/Template.model');

router.post('/', async (req, res) => {
    try {
        const template = new Template(req.body);
        await template.save();
        res.status(201).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const templates = await Template.find(query);
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Template.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Template deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;