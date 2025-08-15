const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');
const { getChecklists, createChecklist, updateChecklist, deleteChecklist } = require('../controllers/checklistController');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createChecklistValidationRules = [
    body('company', 'Company name is required').not().isEmpty().trim().escape(),
    body('items', 'Items must be an array').optional().isArray(),
    body('items.*.title', 'Each checklist item must have a title').not().isEmpty().trim().escape(),
    body('items.*.done', 'Each item done status must be a boolean').isBoolean()
];


const updateChecklistValidationRules = [
    body('items', 'Items must be an array').isArray(),
    body('items.*.title', 'Each checklist item must have a title').not().isEmpty().trim().escape(),
    body('items.*.done', 'Each item done status must be a boolean').isBoolean()
];


// @route   GET api/checklists
router.get('/', auth, getChecklists);

// @route   POST api/checklists
router.post('/', auth, createChecklistValidationRules, handleValidationErrors, createChecklist);

// @route   PUT api/checklists/:id
router.put('/:id', auth, updateChecklistValidationRules, handleValidationErrors, updateChecklist);

// @route   DELETE api/checklists/:id
router.delete('/:id', auth, deleteChecklist);

module.exports = router;