const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to specifically allow your Vercel frontend
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.use(express.json());

// Your routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs')); 
app.use('/api/goals', require('./routes/goals'));
app.use('/api/checklists', require('./routes/checklists'));

// Your database connection and app.listen
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});