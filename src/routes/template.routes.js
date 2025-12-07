const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, templateController.getAllTemplates);
router.get('/:id', authMiddleware, templateController.getTemplateById);
router.post('/', authMiddleware, templateController.createTemplate);
router.put('/:id', authMiddleware, templateController.updateTemplate);
router.delete('/:id', authMiddleware, templateController.deleteTemplate);

module.exports = router;