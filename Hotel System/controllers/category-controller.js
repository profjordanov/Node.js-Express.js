const Category = require('../models/Category')
const Hotel = require('../models/Hotel')

module.exports = {
  addGet: (req, res) => {
    res.render('category/add')
  },

  addPost: (req, res) => {
    let categoryReq = req.body

    Category.create({
      name: categoryReq.name
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.render('category/add', categoryReq)
    })
  },deleteGet: (req, res) => {
    Category.find().then(categories => {
      res.render('category/delete', {
        categories: categories
      })
    })
  },

  deletePost: (req, res) => {
    let categoryId = req.body.category

    Category.findByIdAndRemove(categoryId).then(() => {
      res.redirect('/')
    })
  },

  all: (req, res) => {
    Category.find().then(categories => {
      res.render('category/all', {
        categories: categories
      })
    })
  },

  getHotels: (req, res) => {
    let id = req.params.id

    Hotel.find({category: id}).then(hotels => {
      Category.findById(id).then(category => {
        res.render('category/hotels-per-category', {
          hotels: hotels,
          category: category
        })
      })
    })
  }

}