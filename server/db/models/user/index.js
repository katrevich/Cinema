const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  vetoed: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);
