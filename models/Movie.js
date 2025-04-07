const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genre: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  posterUrl: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Movie', movieSchema); 