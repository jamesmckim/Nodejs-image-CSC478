const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

// Our "frontend" – a full HTML page
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cloud Project Frontend</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: #0f172a;
      color: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .app {
      background: #020617;
      border-radius: 16px;
      padding: 24px 28px;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
      border: 1px solid #1e293b;
    }

    h1 {
      font-size: 1.4rem;
      margin: 0 0 4px;
    }

    .subtitle {
      font-size: 0.9rem;
      color: #9ca3af;
      margin-bottom: 20px;
    }

    .status {
      padding: 10px 12px;
      border-radius: 10px;
      background: #020617;
      border: 1px solid #1e293b;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      margin-bottom: 18px;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #22c55e;
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.7);
    }

    .controls {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    button {
      flex: 1;
      border-radius: 999px;
      border: none;
      padding: 10px 14px;
      font-size: 0.95rem;
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.2s ease;
    }

    button.primary {
      background: #2563eb;
      color: white;
      box-shadow: 0 12px 20px rgba(37, 99, 235, 0.35);
    }

    button.primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 16px 30px rgba(37, 99, 235, 0.5);
    }

    button.secondary {
      background: #020617;
      color: #e5e7eb;
      border: 1px solid #1e293b;
    }

    button.secondary:hover {
      background: #020617;
      transform: translateY(-1px);
      box-shadow: 0 10px 18px rgba(15, 23, 42, 0.7);
    }

    .output-label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 4px;
    }

    .output-box {
      border-radius: 10px;
      border: 1px solid #1e293b;
      background: #020617;
      padding: 10px 12px;
      min-height: 48px;
      font-family: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.85rem;
      color: #d1d5db;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .small {
      font-size: 0.8rem;
      color: #6b7280;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="app">
    <h1>Cloud Project Frontend</h1>
    <div class="subtitle">Simple UI served by a Node.js HTTP server.</div>

    <div class="status">
      <div class="status-dot"></div>
      <div id="status-text">Server is running on port 3000</div>
    </div>

    <div class="controls">
      <button class="primary" id="hello-btn">Show Hello Message</button>
      <button class="secondary" id="clear-btn">Clear</button>
    </div>

    <div class="output-label">Output</div>
    <div class="output-box" id="output-box">Ready.</div>

    <div class="small">
      Deploy this container as a pod/service and access it via NodePort / LoadBalancer.
    </div>
  </div>

  <script>
    const helloBtn = document.getElementById('hello-btn');
    const clearBtn = document.getElementById('clear-btn');
    const outputBox = document.getElementById('output-box');

    helloBtn.addEventListener('click', () => {
    //BACKEND GOES HERE

    
      outputBox.textContent = 'Hello from the frontend running in your Node.js server!';
    });

    clearBtn.addEventListener('click', () => {
      outputBox.textContent = 'Ready.';
    });
  </script>
</body>
</html>`;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Frontend running at http://${hostname}:${port}/`);
});
