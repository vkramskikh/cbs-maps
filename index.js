const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

require('dotenv').config()

const app = express();
const PORT = 3000;

// Serve the local index.html file
app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), function(err, data) {
    if (err) {
        res.sendStatus(500);
    } else {
        res.set('Content-Type', 'text/html');
        res.send(data.toString().replace('MAPS_API_KEY', process.env.MAPS_API_KEY));
    }
  });
});

app.use('*', createProxyMiddleware({target: 'https://maps.nrc.nl', changeOrigin: true}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
