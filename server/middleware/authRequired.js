const jwt = require('jsonwebtoken');
const config = require('../db');
const morgan = require('morgan');

module.exports = (req, res, next) => {
  console.log('Header: '+req.get('Authorization'));
  jwt.verify(req.get('Authorization'), config.secret, (err, decoded) => {
    if(!err) {
      req.decoded = decoded;
      next();
    } else {
      console.log('err');
      morgan(':method :url :status :res[content-length] - :response-time ms');
      return res.status(401).json({success: false, error: "Autentification failed!"});
    }
  })
}
