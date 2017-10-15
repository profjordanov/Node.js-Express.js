const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const path = 'mongodb://localhost/express.js-practice'

module.exports = mongoose.createConnection(path, {useMongoClient: true})

