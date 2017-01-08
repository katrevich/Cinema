const express = require('express');
const router = express.Router();
const api = require('./controller');

router.post('/movie', api.addMovie);
router.get('/movies', api.getMovies);
router.put('/movies', api.removeMovie);
router.put('/movie', api.voteForMovie);

module.exports = router;
