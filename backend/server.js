const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

// Session configuration - FIXED MONGO_URL REFERENCE
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || process.env.MONGO_URI,
    ttl: 30 * 60 // 30 minutes
  }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 30 * 60 * 1000
  }
}));

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://task-flow-chi-one.vercel.app',
    'https://task-flow-pusala-koteshs-projects.vercel.app',
    'https://task-flow-git-main-pusala-koteshs-projects.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Session timeout middleware
app.use((req, res, next) => {
  if (req.session.userId) {
    const now = Date.now();
    const lastActivity = req.session.lastActivity || now;

    if (now - lastActivity > 30 * 60 * 1000) {
      req.session.destroy((err) => {
        if (err) console.log('Session destruction error:', err);
        return res.status(401).json({ 
          message: 'Session expired. Please login again.'
        });
      });
      return;
    }
    req.session.lastActivity = now;
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working with database!' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Server is running with MongoDB',
    timestamp: new Date().toISOString()
  });
});

// Database connection - FIXED TO USE SAME VARIABLE
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
