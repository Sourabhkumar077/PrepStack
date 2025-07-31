import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController'; // login ko import karein

// @route   POST api/auth/register
[cite_start]// @desc    Register a new user [cite: 106]
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
[cite_start]// @desc    Authenticate user & get token [cite: 125]
// @access  Public
router.post('/login', login); // Naya route add karein

export default router;