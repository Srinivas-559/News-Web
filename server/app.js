const express = require('express');
const http = require('http'); // Import the HTTP module
const { Server } = require('socket.io'); // Import Socket.IO
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const eventRoutes = require('./routes/eventRoutes');
const uploadRoutes = require("./routes/uploadRoutes");

require('dotenv').config();
connectDB();

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://localhost:5174',
      'http://localhost:5173',
    ], // Frontend URLs
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/events', eventRoutes);
app.use("/api", uploadRoutes);

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3001', 'http://localhost:5174', 'http://localhost:5173'], // Allow these origins
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow credentials
  },
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make `io` available globally (optional, but useful for controllers)
app.set('io', io);

// Export the server instead of the app
module.exports = server;