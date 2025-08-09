const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '5h' }, 
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id 
            }
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '5h' }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Get the logged-in user's data
exports.getMe = async (req, res) => {
  try {
    // req.user.id is attached by our auth middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Calculate and get the user's daily study streak
exports.getUserStreak = async (req, res) => {
  try {
    // We need the Log model for this
    const Log = require('../models/Log');

    // Find all logs for the user, sorted from newest to oldest
    const logs = await Log.find({ user: req.user.id }).sort({ date: -1 });

    if (logs.length === 0) {
      return res.json({ streak: 0 });
    }

    // --- Streak Calculation Logic ---
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day

    // Use a Set to only count unique days
    const uniqueLogDates = new Set(logs.map(log => log.date));
    const sortedDates = [...uniqueLogDates].map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }).sort((a, b) => b - a); // Sort dates descending

    // Check if the most recent log is today or yesterday
    const mostRecentLogDate = sortedDates[0];
    const diffTime = today.getTime() - mostRecentLogDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
        // If the last log was more than a day ago, streak is 0
        return res.json({ streak: 0 });
    }

    // If we're here, the streak is at least 1
    currentStreak = 1;

    // Loop through the rest of the dates to find consecutive days
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const currentDate = sortedDates[i];
      const previousDate = sortedDates[i + 1];
      
      const dayDifference = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);
      
      if (dayDifference === 1) {
        currentStreak++;
      } else {
        // If there's a gap, the streak is broken
        break;
      }
    }

    res.json({ streak: currentStreak });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};