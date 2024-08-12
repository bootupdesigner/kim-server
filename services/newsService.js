// /services/newsService.js
const axios = require('axios');

const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
const GUARDIAN_API_URL = 'https://content.guardianapis.com/search';

let newsCache = {
  data: null,
  timestamp: null,
};

const fetchNewsData = async () => {
  try {
    const response = await axios.get(GUARDIAN_API_URL, {
      params: {
        'api-key': GUARDIAN_API_KEY,
        section: 'us-news',
        'order-by': 'newest',
        'page-size': 5,
      },
    });

    const articles = response.data.response.results.map((article) => ({
      title: article.webTitle,
      url: article.webUrl,
    }));

    return articles;
  } catch (error) {
    throw new Error('Error fetching news data');
  }
};

const checkNewsCache = (req, res, next) => {
  const currentTime = Date.now();
  const cacheDuration = 3600000; // 1 hour

  if (newsCache.data && newsCache.timestamp && currentTime - newsCache.timestamp < cacheDuration) {
    res.json(newsCache.data);
  } else {
    next();
  }
};

const updateNewsCache = (newsData) => {
  newsCache.data = newsData;
  newsCache.timestamp = Date.now();
};

module.exports = { fetchNewsData, checkNewsCache, updateNewsCache };
