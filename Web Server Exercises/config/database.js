const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')

function getMovies () {
  if(!fs.existsSync(dbPath)){
    fs.writeFileSync(dbPath, '[]')
    return []
  }
  
  let json = fs.readFileSync(dbPath).toString() || '[]'
  let movies = JSON.parse(json)
  return movies
}

function saveMovies (movies) {
  let json = JSON.stringify(movies)
  fs.writeFileSync(dbPath, json)
}

function getSingle (movieId) {
  return getMovies().filter(m => m.id === movieId)[0];
}

module.exports.movies = {}

module.exports.movies.getAll = getMovies

module.exports.movies.getById = getSingle

module.exports.movies.add = (movie) =>{
  let movies = getMovies()
  movie.id = movies.length + 1
  movies.push(movie)
  saveMovies(movies)
}
