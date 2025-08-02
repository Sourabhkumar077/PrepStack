const Goal = require('../models/Goal');

const defaultSubjects = ['Data Structures & Algorithms', 'Aptitude', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Human Resources'];

// @desc    Get all goals, create defaults if none exist
exports.getGoals = async (req, res) => {
  try {
    let goals = await Goal.find({ user: req.user.id });

    // If user has no goals, create the default set for them
    if (goals.length === 0) {
      const defaultGoals = defaultSubjects.map(subject => ({
        user: req.user.id,
        subject: subject,
      }));
      goals = await Goal.insertMany(defaultGoals);
    }

    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a goal
exports.updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ msg: 'Goal not found' });
    }
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};