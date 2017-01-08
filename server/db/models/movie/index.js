const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  backdrop_path: String,
  release_date: Date,
  overview: String,
  votes: {
    type: Number,
    default: 0
  }
});

const Movie = mongoose.model('Movie', movieSchema);
