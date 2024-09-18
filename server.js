// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const intexRoutes = require('./routes/intexRoutes');
app.use('/api/intex', intexRoutes);

app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const rewardRoutes = require('./routes/rewardRoutes');
app.use('/api/rewards', rewardRoutes);

// Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start the server only if this script is run directly (not during tests)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for testing
module.exports = app;

