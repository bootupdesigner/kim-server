const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weatherRoutes = require('./routes/weather');
const newsRoutes = require('./routes/news');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Use the routes
app.use(weatherRoutes);
app.use(newsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
