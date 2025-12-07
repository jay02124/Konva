const express = require('express');
const router = express.Router();
const shapeController = require('../controllers/shape.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', authMiddleware, shapeController.getAllShapes);
router.post('/', authMiddleware, upload.single('file'), shapeController.createShape);
router.delete('/:id', authMiddleware, shapeController.deleteShape);

module.exports = router;