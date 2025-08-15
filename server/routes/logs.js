const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');
const { getLogs, createLog, deleteLog, updateLog } = require('../controllers/logController');


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const logValidationRules = [
    body('date', 'Date is required and must be in YYYY-MM-DD format').isISO8601().toDate(),
    body('subjects', 'Subjects must be an array').isArray({ min: 1 }),
    body('subjects.*.name', 'Each subject must have a name').not().isEmpty().trim().escape(),
    body('subjects.*.hours', 'Each subject must have hours and it must be a number').isNumeric(),
    body('subjects.*.notes', 'Notes must be a string').optional().isString().trim().escape(),
    body('overallNote', 'Overall note must be a string').optional().isString().trim().escape()
];


// @route   GET api/logs
// @desc    Get all user's logs
// @access  Private
router.get('/', auth, getLogs);

// @route   POST api/logs
// @desc    Add a new log
// @access  Private
router.post('/', auth, logValidationRules, handleValidationErrors, createLog);

// @route   DELETE /api/logs/:id
// @desc    Delete a log
// @access  Private
router.delete('/:id', auth, deleteLog);

// @route   PUT api/logs/:id
// @desc    Update a log
// @access  Private
router.put('/:id', auth, logValidationRules, handleValidationErrors, updateLog);

module.exports = router;