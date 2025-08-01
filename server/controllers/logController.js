const Log = require('../models/Log');

// Get all logs for a user
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new log
exports.createLog = async (req, res) => {
  const { date, subjects, overallNote } = req.body;
  try {
    const newLog = new Log({
      user: req.user.id,
      date,
      subjects,
      overallNote,
    });
    const log = await newLog.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};