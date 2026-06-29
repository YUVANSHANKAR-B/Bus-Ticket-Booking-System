require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Validate environment configuration
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI is not defined. Set this environment variable before starting the server.');
}
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is not defined. Set this environment variable before starting the server.');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection failed:', err.message || err));

// Routes
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);

// Start server when running locally
const startServer = () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;
