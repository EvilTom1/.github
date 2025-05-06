const { exec } = require('child_process');

require('http').createServer(function (req, res) {
  let command = req.url.substring(1); // simulate untrusted input
  exec(command, function (err, stdout, stderr) {
    res.end(stdout);
  });
}).listen(8080);
