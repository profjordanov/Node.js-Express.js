let path = require('path')
let fs = require('fs')
let qs = require('querystring')
let database = require('../config/database')

module.exports = (req,res) =>{
  if(req.path === '/movies/add' && req.method === 'GET'){
    let filePath = path.normalize(path.join(__dirname, '../content/addMovie.html'))

    fs.readFile(filePath, (err,data)=>{
      if(err){
        console.log(err)
      }

      res.writeHead(200, {
        'Content-Type':'text/html'
      })
      res.write(data)
      res.end()
    })
  }else if(req.path === '/movies/add' && req.method === 'POST'){
    let body = ''

    req.on('data',(data) =>{
      body += data
    })

    req.on('end', () =>{
      let movie = qs.parse(body)

      if(!movie.movieTitle || !movie.movieYear || !movie.moviePoster || !movie.movieDescription){
        res.writeHead(200)
        res.write('Some of the fields are not filled.')
        res.end()
      }else {
        database.movies.add(movie)
        res.writeHead(302, {
          Location: '/movies/all'
        })
        res.end()
      }
    })
  }else if(req.path === '/movies/all' && req.method === 'GET'){
    let filePath = path.normalize(path.join(__dirname,'../content/viewAll.html'))

    fs.readFile(filePath, (err,data) =>{
      if(err){
        console.log(err)
        res.writeHead(404, {
          'Content-Type':'text/plain'
        });
        res.write('404 NOT FOUND!')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-Type':'text/html'
      })

      let movies = database.movies.getAll()
      let content = ''

      for(let movie of movies){
        content += `<div class="movie">
          <img class="moviePoster" src="${movie.moviePoster}"/>
          <h2>${movie.movieTitle}</h2>
          <a href=/movies/details/${movie.id}>View Details</a>          
        </div>`
      }

      let html = data.toString().replace('{{replaceMe}}', content)
      res.write(html)
      res.end()

    })
  }else if(req.path.startsWith('/movies/details/') && req.method === 'GET'){
    let id = Number(req.path.split('/').pop())

    let filePath = path.normalize(path.join(__dirname,'../content/details.html'))
    fs.readFile(filePath, (err,data) =>{
      if(err){
        console.log(err)
        res.writeHead(404,{
          'Content-Type': 'text/plain'
        })
        res.write('404 Not Found!')
        res.end()
        return
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      let movie = database.movies.getById(id)
      content = `<div class="movie">
          <img class="moviePoster" src="${movie.moviePoster}"/>
          <h2>${movie.movieTitle}</h2>        
        </div>`
      let html = data.toString().replace('{{replaceMe}}', content).replace('{movie.id}', movie.id);

      res.write(html);
      res.end();
    })
  }
  else {
    return true;
  }
}