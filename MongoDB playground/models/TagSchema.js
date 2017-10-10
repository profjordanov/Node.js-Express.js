const mongoose = require('mongoose')

let tagSchema = mongoose.Schema({
  tagName: {type: mongoose.Schema.Types.String, required: true},
  creationDate: {type: mongoose.Schema.Types.Date, default: Date.now()},
  images: [{type: mongoose.Schema.Types.ObjectId, ref:'ImageSchema'}]
})

tagSchema.pre('save', function (next) {
  this.tagName = this.tagName.toLowerCase()
  next()
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag