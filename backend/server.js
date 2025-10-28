// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/todos', require('./routes/todos'));

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend is working with database!' });
// });

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Server is running with MongoDB',
//     timestamp: new Date().toISOString()
//   });
// });

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp')
//   .then(() => {
//     console.log('✅ MongoDB connected successfully!');
//     console.log('📊 Database:', mongoose.connection.db.databaseName);
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//     process.exit(1);
//   });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
//   console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
//   console.log(`✅ Test route: http://localhost:${PORT}/api/test`);
//   console.log('🗄️ Using REAL MongoDB database - data will persist!');
// });

// // Handle graceful shutdown
// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed');
//   process.exit(0);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 30 * 60 * 1000 // 30 minutes
  }
}));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Session timeout middleware (Add this after session middleware)
app.use((req, res, next) => {
  if (req.session.userId) {
    const now = Date.now();
    const lastActivity = req.session.lastActivity || now;
    
    // 30 minutes timeout
    if (now - lastActivity > 30 * 60 * 1000) {
      req.session.destroy((err) => {
        if (err) {
          console.log('Session destruction error:', err);
        }
        return res.status(401).json({ 
          message: 'Session expired. Please login again.' 
        });
      });
      return;
    }
    
    // Update last activity time
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

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp')
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Test route: http://localhost:${PORT}/api/test`);
  console.log('🗄️ Using REAL MongoDB database - data will persist!');
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});