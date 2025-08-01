const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getLogs, createLog,deleteLog ,updateLog} = require('../controllers/logController');

// @route   GET api/logs
// @desc    Get all user's logs
// @access  Private
router.get('/', auth, getLogs);

// @route   POST api/logs
// @desc    Add a new log
// @access  Private
router.post('/', auth, createLog);


// @route   DELETE /api/logs/:id
// @desc    Delete a log
// @access  Private
router.delete('/:id', auth, deleteLog);

// @route   PUT api/logs/:id
// @desc    Update a log
// @access  Private
router.put('/:id', auth, updateLog);

module.exports = router;