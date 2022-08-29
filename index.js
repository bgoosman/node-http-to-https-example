const config = {
  username: 'admin',
  password: 'admin',
  host: 'https://localhost:17778',
  path: '/Query',
}
const httpProxy = require('http-proxy')
const express = require('express');
const app = express()
const port = 3000

const proxy = new httpProxy.createProxyServer();
app.get('/proxy', function (req, res) {
  if (!("query" in req.query)) return res.send("query missing in the querystring (e.g. ?query=SELECT%20HelloWorld");
  const { username, password, host, path } = config;
  const query = `?query=${encodeURIComponent(req.query)}`;
  proxy.web(req, res, {
    ignorePath: true,
    target: host + path + query,
    secure: false,
    auth: `${username}:${password}`,
    timeout: 10000,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})