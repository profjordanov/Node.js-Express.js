const mongoose = require('mongoose')

let ObjectId = mongoose.types.Schema.ObjectId

let meme = mongoose.Schema({
  memeName: {type: String, required: true},
  memeTitle: {type: String, required: true},
  description: {type: String},
  dateOfCreation: {type: Date, default: Date.now()},
})

module.exports = mongoose.model('Memes', meme)