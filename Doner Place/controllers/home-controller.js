const Product = require('../models/Product')

module.exports = {
  index: (req, res) => {
  //  let chickens = Product.find({category: 'chicken'})
  //  let lambs = Product.find({category: 'lamb'})
  //  let beefs = Product.find({category: 'beef'})

    Product.find({category: 'chicken'}).then(chickens =>{
      Product.find({category: 'lamb'}).then(lambs =>{
        Product.find({category: 'beef'}).then(beefs =>{
          res.render('home/index',{
            chickens: chickens,
            lambs: lambs,
            beefs: beefs
          })
        })
      })
    })
  }
}