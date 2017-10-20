const Hotel = require('../models/Hotel')
const Category = require('../models/Category')
const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = {
  addGet: (req, res) => {
    if (req.user.isBlocked) {
      res.redirect('/')
      return
    }
    Category.find().then(categories => {
      res.render('hotel/add'), {
        categories: categories
      }
    })
  },

  addPost: (req, res) => {
    if (req.user.isBlocked) {
      res.redirect('/')
      return
    }
    let hotelReq = req.body
    Hotel.create({
      title: hotelReq.title,
      description: hotelReq.description,
      location: hotelReq.location,
      imageURL: hotelReq.imageURL,
      author: req.user._id
    }).then(hotel => {
      Category.findByIdAndUpdate(hotel.category.toString(), {$addToSet: {hotels: hotel._id}})
        .then(() => {
          res.redirect(`/hotel/${hotel._id}/${hotel.title}`)
        })
    }).catch(() => {
      Category.find().then(categories => {
        res.render('hotel/add', {
          categories: categories,
          hotel: hotelReq
        })
      })
    })
  },

  all: (req, res) => {
    let pageSize = 20
    let page = Number(req.query.page) || 1

    Hotel.find().populate('author').sort('-dateOfCreation').skip((page - 1) * pageSize).limit(pageSize)
      .then(hotels => {
        res.render('hotel/list', {
          hotels: hotels,
          hasPrevPage: page > 1,
          hasNextPage: hotels.length === pageSize,
          prevPage: page - 1,
          nextPage: page + 1
        })
      })
  },

  viewHotelGet: (req, res) =>{
    let id = req.params.id

    Hotel.findById(id).populate('author').then(hotel =>{
      Comment.find({hotel: hotel._id.toString()}).populate('author').sort('date').then(comments =>{
        hotel.views = hotel.views + 1
        hotel.save().then(hotel =>{
          if(req.user){
            res.render('hotel/view',{
              hotel: hotel,
              comments: comments,
              hasLiked: req.user.likedHotels.indexOf(hotel._id) > -1
            })
          }else{
            res.render('hotel/view',{
              hotel: hotel,
              comments: comments
            })
          }
        })
      })
    })
  },

  editGet: (req, res) => {
    let id = req.params.id

    Hotel.findById(id).then(hotel => {
      Category.find().then(categories => {
        res.render('hotel/edit', {
          hotel: hotel,
          categories: categories
        })
      })
    })
  },

  editPost: (req, res) => {
    let id = req.params.id
    let hotelReq = req.body

    Hotel.findById(id).then(hotel => {
      let oldCategory = hotel.category
      hotel.title = hotelReq.title
      hotel.description = hotelReq.description
      hotel.location = hotelReq.location
      hotel.category = hotelReq.category
      hotel.save().then(() => {
        if (oldCategory.toString() !== hotelReq.category) {
          Category.findByIdAndUpdate(oldCategory, {$pull: {hotels: {$in: [hotel._id]}}}).then(() => {
            Category.findByIdAndUpdate(hotel.category, {$push: {hotels: {_id: hotel._id}}}).then(() => {
              res.redirect(`/hotel/${hotel._id}/${hotel.title}`)
            })
          })
        } else {
          res.redirect(`/post/${hotel._id}/${hotel.title}`)
        }
      })
    })
  },
  deleteGet: (req, res) => {
    let id = req.params.id

    Hotel.findById(id).then(hotel => {
      res.render('hotel/delete', {hotel: hotel})
    })
  },
  deletePost: (req, res) => {
    let id = req.params.id

    Hotel.findByIdAndRemove(id).then(hotel => {
      Comment.remove({hotel: id}).then(() => {
        Category.findByIdAndUpdate(hotel.category.toString(), {$pull: {hotels: {$in: [id]}}}).then(() => {
          res.redirect('/')
        })
      })
    })
  }
}