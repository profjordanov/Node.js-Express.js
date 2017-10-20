const Comment = require('../models/Comment')
const Hotel = require('../models/Hotel')

module.exports = {
  addPost: (req, res) => {
    let id = req.params.id
    let commentReq = req.body
    if (!req.user.isBlocked) {
      Comment.create({
        hotel: id,
        author: req.user._id,
        content: commentReq.content
      }).then((comment) =>{
        Hotel.findById(id).populate('author').then(hotel =>{
          hotel.comments.push(comment._id)
          hotel.save().then(hotels =>{
            Comment.find({hotel: hotel._id.toString()}).populate('author').sort('date')
              .then(comments =>{
                if(req.user){
                  res.render('hotel/view',{
                    hotel: hotel,
                    comments: comments,
                    hasLiked: req.user.likedHotels.indexOf(hotel._id) > -1
                  })
                }else{
                  res.render('hotel/view', {
                    hotel: hotel,
                    comments: comments
                  })
                }
              })
          })
        })
      })
    } else {
      res.redirect('/')
    }
  }
}