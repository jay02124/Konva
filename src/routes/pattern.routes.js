const express = require('express');
const router = express.Router();
const patternController = require('../controllers/pattern.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', authMiddleware, patternController.getAllPatterns);
router.post('/', authMiddleware, upload.single('file'), patternController.createPattern);
router.delete('/:id', authMiddleware, patternController.deletePattern);

module.exports = router;