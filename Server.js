
// Import Express and dotenv
const express = require('express');
require('dotenv').config();

// Create Express application
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static HTML files
app.use(express.static('public'));

// GET route (Home page)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// POST route (Create user)
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Check for missing data
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }

    res.json({
        message: `Hello, ${name}!`,
        email: email
    });
});

// GET route (User profile)
app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    res.send(`User ${id} profile`);
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

// Start server using PORT from .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
