const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Multer for in-memory storage (or disk storage if preferred)
const storage = multer.memoryStorage(); // Store file in memory for Cloudinary
const upload = multer({ storage: storage });

router.post('/image', upload.single('file'), async (req, res) => {
    try {
        // Log request to debug
        console.log('File:', req.file);
        console.log('Body:', req.body);

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload to Cloudinary using buffer
        const result = await cloudinary.uploader.upload_stream(
            {
                folder: 'images',
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    throw error;
                }
                res.status(200).json({ url: result.secure_url });
            }
        ).end(req.file.buffer);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: error.message });
    }
});


// GET endpoint to fetch all images from the 'images' folder
router.get('/images', async (req, res) => {
    try {
        // Fetch images from Cloudinary
        const result = await cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload', // Specify the type as 'upload'
            prefix: 'images', // Folder name in Cloudinary
            max_results: 100, // Adjust as needed
        });

        // Log raw response for debugging
        console.log('Fetched images:', result.resources);

        // Map the results to return only necessary data
        const images = result.resources.map(image => ({
            url: image.secure_url,
            public_id: image.public_id,
            created_at: image.created_at,
        }));

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;