const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  price: Number,
  description: String,
  rating: { type: Number, default: 4.0 }
});

module.exports = mongoose.model('Product', productSchema);

