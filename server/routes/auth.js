const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, getMe,getUserStreak } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');


// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    '/register',
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    handleValidationErrors,
    register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists()
    ],
    handleValidationErrors,
    login
);

router.get('/me', auth, getMe);

// @route   GET api/auth/streak
// @desc    Get user's current study streak
// @access  Private
router.get('/streak', auth, getUserStreak);

module.exports = router;