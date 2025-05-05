const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Improved MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'cs348project' // Add this line to specify the database name
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Health check route
app.get('/', (req, res) => {
  res.send('JobConnect backend is up and running!');
});

// Routes
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


