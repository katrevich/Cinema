const mongoose = require('mongoose');
const dbConfig = require('../db');
const Movie = mongoose.model('Movie');

const controller = {
  addMovie: (req, res) => {
    var movieModel = new Movie(req.body.movie);
    movieModel.save((err) => {
      if(err){
        res.send(err)
      } else {
        res.send({status: 'ok'})
      }
    });
  },

  voteForMovie: (req, res) => {
    Movie.update({title: req.body.title}, {$inc: {votes: 1}}, (err) => {
      res.send(err);
    })
  },

  getMovies: (req, res) => {
    Movie.find({}, (err, movies) => {
      res.send(movies);
    })
  },

  removeMovie: (req, res) => {
    console.log(req.body);
    Movie.remove({title: req.body.title}, (err) => {
      res.send(err);
    })
  }
}

module.exports = controller;
