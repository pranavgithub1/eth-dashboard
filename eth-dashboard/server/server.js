const express = require('express');
const path = require('path');
const app = express();

var fs = require('fs');
var https = require('https');

var cfg = require('../../config');
const port = cfg.frontend.port;
app.use(express.static(path.join(__dirname,'..','build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'..', 'build', 'index.html'));
});
// https
options = {
  key: "",
  cert: ""
}
httpsServer = https.createServer(options,app);
// change app to httpServer for https
app.listen(port,'0.0.0.0',()=>console.log(`App listening on port ${port}`));
