const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, getMe } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

router.get('/me', auth, getMe);

module.exports = router;