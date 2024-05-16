// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
