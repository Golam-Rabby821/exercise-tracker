const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  log: [{
    description: String,
    duration: Number,
    date: Date
}]
})


// Models
const User = mongoose.model('User', userSchema);

module.exports = { User}