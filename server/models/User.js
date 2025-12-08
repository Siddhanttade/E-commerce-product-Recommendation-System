const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // e.g., 'user1'
  name: { type: String, required: true },
  persona: { type: String, default: 'General Shopper' } // Description for context
});

module.exports = mongoose.model('User', userSchema);
