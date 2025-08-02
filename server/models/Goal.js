const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String, // e.g., "DSA", "Aptitude"
    required: true,
  },
  totalTopics: {
    type: Number,
    default: 0,
  },
  completedTopics: {
    type: [String], // list of names of completed topics
    default: [],
  },
  resources: {
    type: [String], // URLs or titles of relevant resources/notes
    default: [],
  },
});

module.exports = mongoose.model('Goal', GoalSchema);