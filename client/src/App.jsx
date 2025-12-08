import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

const AVAILABLE_CATEGORIES = ['Electronics', 'Fitness', 'Office', 'Kitchen'];
const AVAILABLE_TAGS = ['gaming', 'audio', 'fitness', 'workout', 'work', 'ergonomic', 'appliance', 'wireless', 'portable'];

function App() {
  const [preferences, setPreferences] = useState({
    categories: [],
    tags: [],
    minPrice: 0,
    maxPrice: 500
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleTag = (tag) => {
    setPreferences(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const getRecommendations = async () => {
    if (preferences.categories.length === 0 && preferences.tags.length === 0) {
      alert('Please select at least one category or interest!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/recommendations`, preferences);
      setRecommendations(response.data);
    } catch (err) {
      console.error(err);
      alert('Error getting recommendations');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="header-badge">
          <h1>🛍️ Smart Recommender</h1>
        </div>
        <p>Choose your preferences and let AI recommend products for you</p>
      </div>

      {/* Preference Controls */}
      <div className="preferences-card">
        <h2 className="preferences-title">🎯 What are you looking for?</h2>

        {/* Categories */}
        <div className="preference-section">
          <label className="preference-label">Categories:</label>
          <div className="button-group">
            {AVAILABLE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`preference-btn ${preferences.categories.includes(cat) ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tags/Interests */}
        <div className="preference-section">
          <label className="preference-label">Interests:</label>
          <div className="button-group">
            {AVAILABLE_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`preference-btn ${preferences.tags.includes(tag) ? 'active' : ''}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="preference-section">
          <label className="preference-label">
            Budget: ${preferences.minPrice} - ${preferences.maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={preferences.maxPrice}
            onChange={(e) => setPreferences(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
            className="price-slider"
          />
        </div>

        {/* Get Recommendations Button */}
        <button onClick={getRecommendations} className="recommend-btn">
          ✨ Get AI Recommendations
        </button>
      </div>

      {/* Recommendations */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">AI is analyzing your preferences...</p>
        </div>
      ) : recommendations.length > 0 ? (
        <>
          <h2 className="recommendations-header">
            <span>✨</span>
            AI Recommended For You
          </h2>
          <div className="recommendations-grid">
            {recommendations.map((item, index) => {
              const { product, explanation } = item;
              return (
                <div key={product._id || index} className="product-card">
                  {/* Product Header */}
                  <div className="product-header">
                    <div className="product-header-top">
                      <span className="category-badge">{product.category}</span>
                      <div className="rating-badge">
                        ⭐ {product.rating}
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                  </div>

                  {/* Product Body */}
                  <div className="product-body">
                    <div className="product-price">${product.price}</div>

                    {/* Tags */}
                    <div className="tags-container">
                      {product.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>

                    {/* LLM Explanation */}
                    <div className="explanation-box">
                      <div className="explanation-label">
                        <span>🤖 Why AI chose this:</span>
                      </div>
                      <p className="explanation-text">{explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🎯</div>
          <p className="empty-state-text">Select your preferences above and click "Get AI Recommendations"</p>
        </div>
      )}
    </div>
  );
}

export default App;
