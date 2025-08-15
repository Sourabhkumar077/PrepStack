const mongoose = require('mongoose');

const ChecklistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  company: {
    type: String,
    required: true,
  },
  items: [
    {
      title: { type: String, required: true },
      done: { type: Boolean, default: false },
      notes: { type: String, default: '' },
    },
  ],
});

module.exports = mongoose.model('Checklist', ChecklistSchema);