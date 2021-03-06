const express = require('express');
const mongoose = require('mongoose');
const api = require('./api');
const port = 3001;
const config = require('./db');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const encrypt = require('./helpers/encrypt');

mongoose.connect(`mongodb://${config.user}:${config.password}@ds157268.mlab.com:57268/cinema`);

const db = mongoose.connection;

db.on('error', (e) => {
  console.log('connection error');
  console.log(e);
})
db.once('open', () => {
  console.log('connection established');
})

const app = express();

app.use(require('cors')({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(require('body-parser').json());

app.use('/api', api);

app.listen(port, function () {
  console.log('server started');
  console.log('http://localhost/' + port);
})
