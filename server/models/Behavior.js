const mongoose = require('mongoose');

const behaviorSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Keeping it simple (e.g., 'user1')
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  action: { type: String, enum: ['VIEW', 'BUY', 'CART'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Behavior', behaviorSchema);
