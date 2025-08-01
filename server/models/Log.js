const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String, // 'YYYY-MM-DD'
    required: true,
  },
  subjects: [
    {
      name: { type: String, required: true },
      hours: { type: Number, required: true },
      notes: { type: String },
    },
  ],
  overallNote: {
    type: String,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('Log', LogSchema);