const mongoose = require('mongoose')

let hotelSchema = mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, required: true },
  description: { type: mongoose.Schema.Types.String, required: true },
  location: { type: mongoose.Schema.Types.String},
  imageURL: { type: mongoose.Schema.Types.String},
  dateOfCreation: { type: mongoose.Schema.Types.Date, default: Date.now },
  comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'} ],
  likes: { type: mongoose.Schema.Types.Number, default: 0 },
  views: { type: mongoose.Schema.Types.Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

let Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel