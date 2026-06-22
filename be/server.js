require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Prevent browser caching for all API requests
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/leaves', require('./routes/leaves'));

app.listen(3000, () => console.log("Server running on port 3000"));