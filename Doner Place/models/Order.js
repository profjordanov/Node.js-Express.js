const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  date: { type: mongoose.Schema.Types.Date, required: true, default: Date.now },
  toppings: [{type: mongoose.Schema.Types.String}],
  status: {type: String, default:'Pending'},

})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order