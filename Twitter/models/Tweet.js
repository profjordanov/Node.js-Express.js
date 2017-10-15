const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  message: { type: mongoose.Schema.Types.String, required: true, maxLength: 140 },
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: {type: mongoose.Schema.Types.Date, default: Date.now},
  likes: {type: mongoose.Schema.Types.Number, default: 0},
  views: {type: mongoose.Schema.Types.Number, default: 0},
  tags: [{type: mongoose.Schema.Types.String}],
  handles: [{type: mongoose.Schema.Types.String}]
})

let Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet