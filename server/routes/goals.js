const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getGoals, updateGoal } = require('../controllers/goalController');

// @route   GET api/goals
// @desc    Get all user's goals
// @access  Private
router.get('/', auth, getGoals);

// @route   PUT api/goals/:id
// @desc    Update a goal
// @access  Private
router.put('/:id', auth, updateGoal);

module.exports = router;