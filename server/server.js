require('dotenv').config(); // Load .env file

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const appraisalRoutes = require('./routes/appraisalRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

// Connect to Database
connectDB();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/appraisals', appraisalRoutes);
app.use('/api/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
