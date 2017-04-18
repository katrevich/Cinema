const mongoose = require('mongoose');
const config = require('../db');
const Movie = mongoose.model('Movie');
const User = mongoose.model('User');
const encrypt = require('../helpers/encrypt');
const jwt = require('jsonwebtoken');

const controller = {
  addMovie: (req, res) => {
    let movie = req.body.movie;
    Object.assign(movie, {username: req.body.username});
    var movieModel = new Movie(movie);

    movieModel.save((err) => {
      if(err){
        res.status(400).send({success: false, error: "Movie not added"});
        console.log(err);
      } else {
        res.send({success: true, message: 'Movie successfuly added!'});
      }
    });
  },

  voteForMovie: (req, res) => {
    Movie.update({title: req.body.movie.title}, {$addToSet: {"voters": req.body.username}}, (err) => {
      if(err) {
        res.status(400).send({success: false, error: "Movie not added"});
      } else {
        res.send({success: true, message: "Vote counted!"});
      }
    })
  },

  getMovies: (req, res) => {
    Movie.find({}, (err, movies) => {
      res.send(movies);
    })
  },

  removeMovie: (req, res) => {
    Movie.remove({title: req.body.movie.title}, (err) => {
      res.status(400).send({success: false, error: "Movie not removed"});
    })
  },

  veto: (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;

      if(user && !user.vetoed) {
        Movie.findOne({title: req.body.movie.title}, (err, movie) => {
          if(movie) {
            movie.veto = true;
            movie.save(err => {
              if(err) {
                res.status(400).send({success: false, error: "Movie not founed"});
              } else {
                user.vetoed = true;
                user.save((err) => {
                  if(err) {
                    res.status(400).send({success: false, error: "User not founed"});
                  } else {
                    res.send({success: true, message: "Veto accepted!", user});
                  }
                })
              }
            })
          }
        })
      } else {
        res.status(403).send({success: false, error: "Only one veto per voting!"});
      }
    })
  },

  register: (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if(err) throw err;

      if(!user) {
        encrypt.encrypt(req.body.password, hash => {
          let user = new User({
            username: req.body.username,
            password: hash
          });
          user.save(err => {
            if(err){
              res.send(err);
              console.log(err);
            } else {
              res.send({success: true})
            }
          })
        })
      } else {
        res.status(400).send({success: false, error: 'User already exists'});
      }
    })
  },

  login: (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if(err) throw err;

      if(user) {
        encrypt.compare(req.body.password, user.password, valid => {
          if(valid) {
            let token = jwt.sign(user, config.secret, {
              expiresIn : 60*60*24
            });
            res.send({
              success: true,
              username: user.username,
              vetoed: user.vetoed,
              admin: user.admin,
              token
            })
          } else {
            res.status(401).send({success: false, error: 'Wrong username or password'});
          }
        })
      } else {
        res.status(401).send({success: false, error: 'Wrong username or password'});
      }
    })
  },

  getUsers: (req, res) => {
    User.find({}, (err, users) => {
      res.send(users);
    })
  }
}

module.exports = controller;
