// /routes/news.js
const express = require('express');
const { fetchNewsData, checkNewsCache, updateNewsCache } = require('../services/newsService');

const router = express.Router();

router.get('/news', checkNewsCache, async (req, res) => {
  try {
    const newsData = await fetchNewsData();
    updateNewsCache(newsData);
    res.json(newsData);
  } catch (error) {
    res.status(500).send('Error fetching news data');
  }
});

module.exports = router;
