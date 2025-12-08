# 🛍️ AI-Powered E-commerce Product Recommender

An intelligent product recommendation system that uses **LLM (Groq)** to provide personalized product suggestions with detailed explanations. The system recommends **4 products from each selected category** and explains why each product matches your preferences.

![Demo](https://img.shields.io/badge/Status-Active-success)
![Node](https://img.shields.io/badge/Node-v14+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Required-brightgreen)
![Groq](https://img.shields.io/badge/Groq-LLM-blue)

## ✨ Features

- 🎯 **Category-Based Recommendations**: Get 4 products from each selected category
- 🤖 **AI-Powered Explanations**: LLM generates personalized reasons for each recommendation
- 🏷️ **Interest Filtering**: Filter by tags/interests (gaming, fitness, work, etc.)
- 💰 **Budget Control**: Set price range with interactive slider
- 📊 **100+ Products**: Balanced database with 25 products per category
- ⚡ **Fast & Responsive**: Modern React frontend with real-time updates

## 🏗️ Architecture

```
E-commerce/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx     # Main application component
│   │   ├── main.jsx    # Entry point
│   │   └── index.css   # Styles
│   └── package.json
│
├── server/              # Node.js backend (Express)
│   ├── models/
│   │   ├── Product.js  # Product schema
│   │   ├── User.js     # User schema
│   │   └── Behavior.js # User behavior schema
│   ├── services/
│   │   └── recommendationService.js  # LLM recommendation logic
│   ├── seed/
│   │   └── seed.js     # Database seeding script
│   ├── index.js        # Server entry point
│   └── package.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v14 or higher
- **MongoDB** (local or Atlas)
- **Groq API Key** ([Get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd E-commerce
```

2. **Install dependencies**

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

4. **Seed the database**

```bash
cd server/seed
node seed.js
```

You should see:
```
Products and Users seeded.
Behaviors seeded.
```

5. **Start the servers**

**Terminal 1 - Backend:**
```bash
cd server
node index.js
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

6. **Open the app**

Navigate to `http://localhost:5173` in your browser.

## 📖 Usage

### Selecting Preferences

1. **Choose Categories**: Click on category buttons (Electronics, Fitness, Office, Kitchen)
2. **Select Interests**: Click on interest tags (gaming, workout, ergonomic, etc.)
3. **Set Budget**: Adjust the price slider to your budget range
4. **Get Recommendations**: Click "✨ Get AI Recommendations"

### How It Works

- **4 Products Per Category**: If you select 2 categories, you'll get 8 products (4 from each)
- **LLM Selection**: Groq's `llama-3.1-8b-instant` model selects the best products based on your interests
- **Smart Explanations**: Each product includes a detailed explanation of why it matches your preferences
- **Fallback Logic**: If LLM fails, the system uses smart scoring (tag matches + ratings)

## 🗄️ Database

### Collections

- **products**: 100 products across 4 categories (25 each)
- **users**: Sample user personas
- **behaviors**: User interaction data (views, carts, purchases)

### Product Schema

```javascript
{
  name: String,
  category: String,        // Electronics, Fitness, Office, Kitchen
  tags: [String],          // gaming, audio, workout, etc.
  price: Number,
  description: String,
  rating: Number           // 0-5 stars
}
```

## 🤖 LLM Integration

### Groq API

The system uses Groq's **llama-3.1-8b-instant** model for:

1. **Product Selection**: Choosing the best 4 products per category based on user preferences
2. **Explanation Generation**: Creating personalized 2-3 sentence explanations

### Example LLM Prompt (Explanation)

```
You are a helpful shopping assistant explaining why a product is recommended.

User's Preferences:
- Looking for: Electronics, Fitness
- Interested in: gaming, workout
- Budget: $0-$500

Recommended Product:
- Name: Gaming Headset
- Category: Electronics
- Price: $179
- Features/Tags: gaming, audio, rgb
- Rating: 4.5/5

Task: Write 2-3 sentences explaining specifically WHY this product is perfect for them.
```

## 🛠️ API Endpoints

### GET `/api/products`
Get all products from the database.

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Gaming Laptop",
    "category": "Electronics",
    "tags": ["gaming", "high-performance", "laptop"],
    "price": 1299,
    "description": "High-end gaming laptop with RTX graphics.",
    "rating": 4.7
  }
]
```

### POST `/api/recommendations`
Get personalized recommendations based on user preferences.

**Request Body:**
```json
{
  "categories": ["Electronics", "Fitness"],
  "tags": ["gaming", "workout"],
  "minPrice": 0,
  "maxPrice": 500
}
```

**Response:**
```json
[
  {
    "product": { /* product object */ },
    "explanation": "Since you're interested in gaming and audio, these Noise-Cancelling Headphones are perfect! They offer premium wireless audio quality ideal for immersive gaming sessions, and at $299, they fit perfectly within your budget of $0-$500."
  }
]
```

## 🎨 Frontend

Built with:
- **React** 18
- **Vite** 4.5
- **Axios** for API calls
- **Vanilla CSS** with modern design

### Key Components

- **Preference Controls**: Category buttons, interest tags, price slider
- **Recommendations Grid**: Responsive product cards
- **Loading State**: Spinner with "AI is analyzing..." message
- **Product Cards**: Display name, category, price, rating, tags, and AI explanation

## 🔧 Configuration

### Changing Recommendation Count

In `server/services/recommendationService.js`, modify the count parameter:

```javascript
const categoryRecs = await getRecommendationsPerCategory(
  category, 
  preferences, 
  allProducts, 
  4  // Change this number to get more/fewer products per category
);
```

### Adding New Categories

1. Add products to `server/seed/seed.js`
2. Update `AVAILABLE_CATEGORIES` in `client/src/App.jsx`
3. Re-seed the database

### Adding New Tags

1. Add tags to products in `server/seed/seed.js`
2. Update `AVAILABLE_TAGS` in `client/src/App.jsx`
3. Re-seed the database

## 🐛 Troubleshooting

### "Groq API Error: model_decommissioned"
- **Solution**: The model has been updated to `llama-3.1-8b-instant`. Make sure you have the latest code.

### "MongoDB Connection Error"
- **Check**: MongoDB is running (`mongod` command)
- **Check**: Connection string in `.env` is correct
- **Try**: Use MongoDB Atlas cloud database

### No recommendations showing
- **Check**: Database is seeded (`node seed.js`)
- **Check**: Server is running on port 3000
- **Check**: Groq API key is valid in `.env`

### Generic explanations
- **Reason**: LLM API might be failing, using fallback logic
- **Check**: Groq API key and quota
- **Check**: Server logs for API errors

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, MongoDB, and Groq LLM**
# E-commerce-product-Recommendation-System
