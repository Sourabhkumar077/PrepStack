const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL
}));

// This middleware is needed to parse JSON bodies from requests
app.use(express.json());

// This tells Express to use your auth routes for any URL starting with /api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs')); 
app.use('/api/goals', require('./routes/goals'));
app.use('/api/checklists', require('./routes/checklists'));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('PrepStack API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});