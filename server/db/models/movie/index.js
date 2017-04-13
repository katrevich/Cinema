const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [String],
  id: {
    type: Number,
    unique: true
  },
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  votes: {
    type: Number,
    default: 0
  },
  username: String,
  voters: [String]
});

const Movie = mongoose.model('Movie', movieSchema);
