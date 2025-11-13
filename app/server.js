const http = require('http');
const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  res.end('Hello from CI-built container!\n');
});
server.listen(port, () => console.log(`Listening on ${port}`));
