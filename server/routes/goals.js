const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');
const { getGoals, updateGoal } = require('../controllers/goalController');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const goalUpdateValidationRules = [
    body('totalTopics', 'Total topics must be a non-negative integer').optional().isInt({ min: 0 }),
    body('completedTopics', 'Completed topics must be an array of strings').optional().isArray(),
    body('completedTopics.*', 'Each completed topic must be a string').optional().isString().trim().escape(),
    body('resources', 'Resources must be an array of strings').optional().isArray(),
    body('resources.*', 'Each resource must be a string').optional().isString().trim() 
];


// @route   GET api/goals
// @desc    Get all user's goals
// @access  Private
router.get('/', auth, getGoals);

// @route   PUT api/goals/:id
// @desc    Update a goal
// @access  Private
router.put('/:id', auth, goalUpdateValidationRules, handleValidationErrors, updateGoal);

module.exports = router;