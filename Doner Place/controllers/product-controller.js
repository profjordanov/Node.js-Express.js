const Product = require('../models/Product')
const Order = require('../models/Order')

module.exports = {
  addGet: (req, res) => {
    res.render('product/create-product')
  },

  addPost: (req, res) => {
    let productReq = req.body
    let toppingsHere = []
    if (productReq.topping01) {
      toppingsHere.push(productReq.topping01)
    }
    if (productReq.topping02) {
      toppingsHere.push(productReq.topping02)
    }
    if (productReq.topping03) {
      toppingsHere.push(productReq.topping03)
    }
    if (productReq.topping04) {
      toppingsHere.push(productReq.topping04)
    }
    if (productReq.topping05) {
      toppingsHere.push(productReq.topping05)
    }
    if (productReq.topping06) {
      toppingsHere.push(productReq.topping06)
    }
    Product.create({
      category: productReq.category,
      size: productReq.size,
      imageUrl: productReq.imageUrl,
      toppings: toppingsHere
    }).then(product => {
      res.redirect('/')
    })
  },

  editGet: (req, res) => {
    let id = req.params.id

    Product.findById(id).then(product => {
      res.render('product/delete', {
        product: product
      })
    })
  },

  deleteGet: (req, res) => {
    let id = req.params.id

    Product.findById(id).then(product => {
      res.render('product/delete', {
        product: product
      })
    })
  },

  deletePost: (req, res) => {
    let id = req.params.id

    Product.findByIdAndRemove(id).then(product => {
      Order.find({product: product._id}).then(order => {
        Order.findByIdAndRemove(order._id).then(() => {
          res.redirect('/')
        })
      })
    })
  }
}