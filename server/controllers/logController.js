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
// delete the existing log
exports.deleteLog = async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Log.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a log
exports.updateLog = async (req, res) => {
  const { date, subjects, overallNote } = req.body;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    // Make sure user owns the log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedLog = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: { date, subjects, overallNote } },
      { new: true } // Return the updated document
    );

    res.json(updatedLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
