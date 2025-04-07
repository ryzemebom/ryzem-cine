const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  duration: {
    type: Number,
    required: true
  },
  episodeNumber: {
    type: Number,
    required: true
  },
  seasonNumber: {
    type: Number,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  }
});

const seriesSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    default: 0
  },
  posterUrl: {
    type: String,
    required: true
  },
  seasons: [{
    seasonNumber: Number,
    episodes: [episodeSchema]
  }],
  isPremium: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Series', seriesSchema); 