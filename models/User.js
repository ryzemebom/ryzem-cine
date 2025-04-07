const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 