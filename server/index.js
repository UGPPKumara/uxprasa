require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

// const helmet = require('helmet'); // Run 'npm install helmet' to enable
// app.use(helmet()); 

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Start Server FIRST so Render can detect the port immediately
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});

// Connect to MongoDB asynchronously
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/settings', require('./routes/settings'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err);
    res.status(err.status || 500).json({
        message: 'Internal Server Error',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
