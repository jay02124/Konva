const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/images', authMiddleware, uploadController.getAllImages);
router.post('/image', authMiddleware, upload.single('file'), uploadController.uploadImage);
router.delete('/image/:id', authMiddleware, uploadController.deleteImage);

module.exports = router;