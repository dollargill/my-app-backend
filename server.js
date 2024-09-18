// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
app.use('/api/intex', require('./routes/intexRoutes'));

// server.js
// ...
const authRoutes = require('./routes/authRoutes');
// ...

// Use Routes
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');

// Use Routes
app.use('/api/users', userRoutes);

const rewardRoutes = require('./routes/rewardRoutes');

// Use Routes
app.use('/api/rewards', rewardRoutes);

app.use(express.json());

const cors = require('cors');
app.use(cors());

const errorHandler = require('./middlewares/errorHandler');
// ...
app.use(errorHandler);
