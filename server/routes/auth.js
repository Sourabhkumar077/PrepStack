const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, getMe,getUserStreak } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

router.get('/me', auth, getMe);

// @route   GET api/auth/streak
// @desc    Get user's current study streak
// @access  Private
router.get('/streak', auth, getUserStreak);

module.exports = router;