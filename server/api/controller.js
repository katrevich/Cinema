const mongoose = require('mongoose');
const dbConfig = require('../db');
const Movie = mongoose.model('Movie');

const controller = {
  addMovie: (req, res) => {
<<<<<<< HEAD
    let movie = req.body.movie;
    Object.assign(movie, {username: req.body.username});
    var movieModel = new Movie(movie);
    movieModel.save((err) => {
      if(err){
        res.send(err);
        console.log(err);
=======
    var movieModel = new Movie(req.body.movie);
    movieModel.save((err) => {
      if(err){
        res.send(err)
>>>>>>> origin/master
      } else {
        res.send({status: 'ok'})
      }
    });
  },

  voteForMovie: (req, res) => {
<<<<<<< HEAD
    Movie.update({title: req.body.movie.title}, {$inc: {votes: 1}}, (err) => {
=======
    Movie.update({title: req.body.title}, {$inc: {votes: 1}}, (err) => {
>>>>>>> origin/master
      res.send(err);
    })
  },

  getMovies: (req, res) => {
    Movie.find({}, (err, movies) => {
      res.send(movies);
    })
  },

  removeMovie: (req, res) => {
<<<<<<< HEAD
    Movie.remove({title: req.body.movie.title}, (err) => {
=======
    console.log(req.body);
    Movie.remove({title: req.body.title}, (err) => {
>>>>>>> origin/master
      res.send(err);
    })
  }
}

module.exports = controller;
