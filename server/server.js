// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // A good practice for logging HTTP requests

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Configuration ---

// Configure CORS to specifically allow your Vercel frontend URL from environment variables
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.use(express.json());

// Middleware for logging HTTP requests in the console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/checklists', require('./routes/checklists'));

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};
connectDB();

// --- Centralized Error Handler ---
// This middleware will catch any errors that occur in your route handlers,
// preventing the server from crashing and sending a clean error response.
app.use((err, req, res, next) => {
  console.error(err.stack); 
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server';
  
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
});

// --- Default Route ---
app.get('/', (req, res) => {
  res.send('PrepStack API is running...');
});

// Start the server and listen for incoming requests
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});