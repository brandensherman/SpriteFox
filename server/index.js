const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = process.env.PORT || 3000;

module.exports = app;
