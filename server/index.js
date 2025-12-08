const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { getRecommendationsByPreferences } = require('./services/recommendationService');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/recommendations', async (req, res) => {
  try {
    const { categories, tags, minPrice, maxPrice } = req.body;
    
    const preferences = {
      categories: categories || [],
      tags: tags || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 10000
    };

    const recommendations = await getRecommendationsByPreferences(preferences);
    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

