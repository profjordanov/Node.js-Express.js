const Hotel = require('../models/Hotel')

module.exports = {
  index: (req, res) => {
    Hotel.find({}).populate('author').sort('-dateOfCreation').limit(20).then(hotels => {
      res.render('home/index', {hotels})
    })
  },
  about:
    (req, res) => {
      res.render('home/about')
    }
}