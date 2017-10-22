const mongoose = require('mongoose')

let toppingSchema = new mongoose.Schema({
  type: {type: mongoose.Schema.Types.String}
})
// enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce', 'extra sauce']
let Topping = mongoose.model('Topping', toppingSchema)

module.exports = Topping