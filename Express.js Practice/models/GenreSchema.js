const mongoose = require('mongoose')

let ObjectId = mongoose.types.Schema.ObjectId

let genre = mongoose.Schema({
  genreName: {type: String, required: true},
  memeList: [{type:ObjectId, ref: 'Memes'}]
})

module.exports = mongoose.model('Genre', genre)