const fs = require('fs')
const https = require('https')
const cert = fs.readFileSync('cert.pem')
const key = fs.readFileSync('key.pem')

var source = https.createServer({
  key,
  cert,
}, function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello! ' + req.url);
});
source.listen(17778)