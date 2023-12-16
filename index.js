const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the local index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('*', createProxyMiddleware({target: 'https://maps.nrc.nl', changeOrigin: true}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
