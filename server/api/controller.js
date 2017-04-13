const mongoose = require('mongoose');
const dbConfig = require('../db');
const Movie = mongoose.model('Movie');

const controller = {
  addMovie: (req, res) => {
    let movie = req.body.movie;
    Object.assign(movie, {username: req.body.username});
    var movieModel = new Movie(movie);
    movieModel.save((err) => {
      if(err){
        res.send(err);
        console.log(err);
      } else {
        res.send({status: 'ok'})
      }
    });
  },

  voteForMovie: (req, res) => {
    Movie.update({title: req.body.movie.title}, {$inc: {votes: 1}}, (err) => {
      res.send(err);
    })
  },

  getMovies: (req, res) => {
    Movie.find({}, (err, movies) => {
      res.send(movies);
    })
  },

  removeMovie: (req, res) => {
    Movie.remove({title: req.body.movie.title}, (err) => {
      res.send(err);
    })
  }
}

module.exports = controller;
