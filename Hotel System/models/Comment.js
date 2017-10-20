const mongoose = require('mongoose')

let commentSchema = mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  content: { type: mongoose.Schema.Types.String, required: true }
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment