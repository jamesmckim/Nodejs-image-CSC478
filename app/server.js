// server.js - NO EXPRESS VERSION
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

// Read HTML file once
let loginPage = '';
try {
    loginPage = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
} catch (err) {
    loginPage = `
    <!DOCTYPE html>
    <html>
    <head><title>Login</title>
    <style>
        body{margin:0;padding:20px;background:#0f172a;color:white;font-family:sans-serif;}
        .box{max-width:400px;margin:100px auto;background:#1e293b;padding:30px;border-radius:10px;}
        input,button{width:100%;padding:12px;margin:8px 0;border-radius:6px;box-sizing:border-box;}
        input{background:#334155;border:1px solid #475569;color:white;}
        button{background:#3b82f6;border:none;color:white;font-weight:bold;cursor:pointer;}
        .success{background:#10b981;padding:10px;border-radius:6px;}
        .error{background:#ef4444;padding:10px;border-radius:6px;}
    </style>
    </head>
    <body>
        <div class="box">
            <h2>🔐 Login</h2>
            <div id="msg"></div>
            <input id="user" placeholder="Username" value="admin">
            <input id="pass" type="password" placeholder="Password" value="password">
            <button onclick="login()">Login</button>
        </div>
        <script>
            async function login() {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        username: document.getElementById('user').value,
                        password: document.getElementById('pass').value
                    })
                });
                const data = await res.json();
                const msg = document.getElementById('msg');
                msg.className = data.success ? 'success' : 'error';
                msg.textContent = data.message;
            }
        </script>
    </body>
    </html>`;
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // API endpoint
    if (req.method === 'POST' && req.url === '/api/login') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { username, password } = JSON.parse(body);
                if (username === 'admin' && password === 'password') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        message: 'Login successful', 
                        token: 'mock-jwt-token' 
                    }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        message: 'Invalid credentials' 
                    }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: false, 
                    message: 'Bad request' 
                }));
            }
        });
        return;
    }
    
    // Serve HTML for all GET requests
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(loginPage);
        return;
    }
    
    // 404 for everything else
    res.writeHead(404);
    res.end('Not found');
});

server.listen(port, () => {
    console.log(`Login app running on port ${port}`);
    console.log(`Try: curl -X POST http://localhost:${port}/api/login -d '{"username":"admin","password":"password"}' -H "Content-Type: application/json"`);
});
