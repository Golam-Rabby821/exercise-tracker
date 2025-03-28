const mongoose = require('mongoose')

// Create schema
const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: Date
})

const userSchema = new mongoose.Schema({username: {
    type: String,
    required: true,
    unique: true
  }})

const logSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: Number,
  log: [{
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: Date
  }]
})

// Models
const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);
const Log = mongoose.model('Log', logSchema);

module.exports = {Exercise, User, Log}