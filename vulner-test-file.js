// Vulnerable JavaScript code for testing GitHub code scanning
const http = require('http');
const url = require('url');

// Simulate a user database
const users = {
  admin: 'supersecretpassword',
  user: 'password123'
};

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const username = queryObject.username;
  const password = queryObject.password;

  // Vulnerable to hardcoded credentials check (CWE-798)
  if (users[username] && users[username] === password) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome, ' + username);
  } else {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
  }

  // Vulnerable to command injection (CWE-77)
  const { exec } = require('child_process');
  const unsafeInput = queryObject.cmd;
  exec(unsafeInput, (error, stdout, stderr) => {
    if (error) {
      res.write('Error: ' + stderr);
    } else {
      res.write('Output: ' + stdout);
    }
    res.end();
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
