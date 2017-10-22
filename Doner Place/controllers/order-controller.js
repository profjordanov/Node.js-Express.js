const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

module.exports = {
  customizeOrderGet: (req, res) => {
    let id = req.params.id
    Product.findById(id).then(product => {
      res.render('order/customizeOrder', {
        product: product
      })
    })
  },

  customizeOrderPost: (req, res) => {
    let id = req.params.id
    let productReq = req.body
    //console.log(req.body)

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
    //console.log(toppingsHere)

    Product.findById(id).then(product => {
      Order.create({
        product: product._id,
        creator: req.user._id,
        toppings: toppingsHere
      }).then((order) => {
        res.redirect(`/order/orderDetails/${order._id}`)
      })
    })
  },

  orderDetailsGet: (req, res) => {
    let id = req.params.id

    Order.findById(id).populate('product').then(order => {
      Product.findById(order.product._id).then(product => {
        res.render('order/orderDetails', {
          product: product,
          order: order,
          toppings: order.toppings.toString()
        })
      })
    })
  },

  orederStatusGet: (req, res) => {
    let id = req.params.id
    Order.find({creator: id.toString()}).populate('product').then(orders => {
      res.render('order/orderStatus', {
        orders: orders
      })
    })
  },

  manageOrdersGet: (req, res) => {
    Order.find().populate('product').then(orders => {
      res.render('order/manageOrders', {
        orders: orders
      })
    })
  },

  manageOrdersPost: (req, res) => {
    let orderReq = req.body
    let id = orderReq.order_id

    Order.findByIdAndUpdate(id, {status: orderReq.status}).then(() => {
      res.redirect('/')
    })
  }
}