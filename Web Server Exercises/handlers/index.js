let homePageHandler = require('./home-page')
let staticFilesHandler = require('./static-files')
let moviesHandler = require('./movies')
let headerHandler = require('./header')

module.exports = [
  homePageHandler,
  moviesHandler,
  staticFilesHandler,
  headerHandler
]
