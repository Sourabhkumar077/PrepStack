const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getLogs, createLog } = require('../controllers/logController');

// @route   GET api/logs
// @desc    Get all user's logs
// @access  Private
router.get('/', auth, getLogs);

// @route   POST api/logs
// @desc    Add a new log
// @access  Private
router.post('/', auth, createLog);

module.exports = router;