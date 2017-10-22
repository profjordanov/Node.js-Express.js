const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  category: {type: mongoose.Schema.Types.String, required: true},
  size: {type: Number, min: 17, max: 24, required: true},
  imageUrl: {type: mongoose.Schema.Types.String, required: true},
  toppings: [{type: mongoose.Schema.Types.String}]
})
//, enum: ['chicken', 'lamb', 'beef'],
let Product = mongoose.model('Product', productSchema)

module.exports = Product
