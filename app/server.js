// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static('public'));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Mock login API endpoint
app.post('/api/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    
    // Simple authentication logic
    if (username === 'admin' && password === 'password') {
        res.json({ success: true, message: 'Login successful', token: 'mock-jwt-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Login app running on port ${port}`);
});
