const express = require('express');
const router = express.Router();
const Student = require('../models/Student.model');
const XLSX = require('xlsx');
const cloudinary = require('cloudinary').v2;

router.post('/import', async (req, res) => {
    try {
        const fileBuffer = req.body.buffer;
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const students = await Promise.all(data.map(async (row) => {
            let photoUrl = row.Photo;
            if (photoUrl && !photoUrl.includes('cloudinary')) {
                const result = await cloudinary.uploader.upload(photoUrl, { folder: 'students' });
                photoUrl = result.secure_url;
            }
            return {
                name: row.Name,
                studentId: row.StudentID,
                dob: row.DOB,
                photo: photoUrl,
                class: row.Class,
            };
        }));

        await Student.insertMany(students);
        res.status(200).json({ message: 'Students imported successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;