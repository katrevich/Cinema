const express = require('express');
const router = express.Router();
const api = require('./controller');
const authRequired = require('../middleware/authRequired');

router.post('/movie', authRequired, api.addMovie);
router.get('/movies', api.getMovies);
router.put('/movies', authRequired, api.removeMovie);
router.put('/movie', authRequired, api.voteForMovie);

router.post('/register', api.register);
router.post('/login', api.login);
router.get('/users', authRequired, api.getUsers);

module.exports = router;
