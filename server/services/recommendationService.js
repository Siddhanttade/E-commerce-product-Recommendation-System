const Groq = require('groq-sdk');
const Product = require('../models/Product');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Get recommendations per category using LLM
const getRecommendationsPerCategory = async (category, userPreferences, allProducts, count = 4) => {
  // Filter products by category and price range
  const categoryProducts = allProducts.filter(p => 
    p.category === category &&
    p.price >= userPreferences.minPrice && 
    p.price <= userPreferences.maxPrice
  );

  if (categoryProducts.length === 0) return [];

  // If we have fewer products than requested, return all
  if (categoryProducts.length <= count) {
    return categoryProducts;
  }

  // Use LLM to select best products from this category
  const productList = categoryProducts.map((p, idx) => 
    `${idx + 1}. ${p.name} - $${p.price} - Tags: ${p.tags.join(', ')} - Rating: ${p.rating}`
  ).join('\n');

  const prompt = `You are an expert e-commerce recommendation assistant.

User is interested in ${category} products with these preferences:
- Interests/Tags: ${userPreferences.tags.join(', ') || 'any'}
- Budget: $${userPreferences.minPrice} - $${userPreferences.maxPrice}

Available ${category} Products:
${productList}

Task: Select the best ${count} products that match the user's interests. Prioritize products with tags matching their interests. Return ONLY a JSON array of product numbers (1-indexed). Example: [1, 3, 5, 7]

Your response (JSON only):`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 100
    });

    const response = chatCompletion.choices[0]?.message?.content?.trim();
    const productIndices = JSON.parse(response);
    
    return productIndices.map(idx => categoryProducts[idx - 1]).filter(p => p);
  } catch (error) {
    console.error(`LLM Selection Error for ${category}:`, error);
    // Fallback: prioritize by tags match, then rating
    const scored = categoryProducts.map(p => ({
      product: p,
      score: p.tags.filter(t => userPreferences.tags.includes(t)).length * 10 + p.rating
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, count).map(s => s.product);
  }
};

const generateExplanation = async (product, userPreferences) => {
  // Find matching tags
  const matchingTags = product.tags.filter(t => userPreferences.tags.includes(t));
  const matchesCategory = userPreferences.categories.includes(product.category);

  const prompt = `You are a helpful shopping assistant explaining why a product is recommended.

User's Preferences:
- Looking for: ${userPreferences.categories.join(', ')}
- Interested in: ${userPreferences.tags.join(', ') || 'various features'}
- Budget: $${userPreferences.minPrice}-$${userPreferences.maxPrice}

Recommended Product:
- Name: ${product.name}
- Category: ${product.category}
- Price: $${product.price}
- Features/Tags: ${product.tags.join(', ')}
- Rating: ${product.rating}/5

Task: Write 2-3 sentences explaining specifically WHY this product is perfect for them. Mention:
1. How it matches their category interest${matchesCategory ? ' (they selected ' + product.category + ')' : ''}
2. Which specific features/tags align with their interests${matchingTags.length > 0 ? ' (they want: ' + matchingTags.join(', ') + ')' : ''}
3. Why the price is good for their budget

Be enthusiastic, specific, and conversational. Address them as "you".

Your explanation:`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 150
    });
    return chatCompletion.choices[0]?.message?.content?.trim() || "This product matches your selected preferences.";
  } catch (error) {
    console.error('Groq API Error:', error);
    // Fallback explanation
    let explanation = `Perfect choice! `;
    if (matchesCategory) {
      explanation += `This ${product.category} product is exactly what you're looking for. `;
    }
    if (matchingTags.length > 0) {
      explanation += `It matches your interest in ${matchingTags.join(' and ')}, `;
    }
    explanation += `and at $${product.price}, it fits perfectly within your budget.`;
    return explanation;
  }
};

const getRecommendationsByPreferences = async (preferences) => {
  // Get all products
  const allProducts = await Product.find();

  let allRecommendations = [];

  // Get 4 products from each selected category
  for (const category of preferences.categories) {
    const categoryRecs = await getRecommendationsPerCategory(
      category, 
      preferences, 
      allProducts, 
      4
    );
    allRecommendations = allRecommendations.concat(categoryRecs);
  }

  // If no categories selected, use tags to find products
  if (preferences.categories.length === 0 && preferences.tags.length > 0) {
    const tagProducts = allProducts.filter(p => 
      p.tags.some(t => preferences.tags.includes(t)) &&
      p.price >= preferences.minPrice && 
      p.price <= preferences.maxPrice
    );
    allRecommendations = tagProducts.slice(0, 8);
  }

  // Generate explanations for each
  const recommendations = await Promise.all(allRecommendations.map(async (p) => {
    const explanation = await generateExplanation(p, preferences);
    return {
      product: p,
      explanation
    };
  }));

  return recommendations;
};

module.exports = { getRecommendationsByPreferences };


