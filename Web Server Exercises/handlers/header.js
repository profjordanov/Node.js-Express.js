let fs = require('fs');
let path = require('path');
let database = require('../config/database')

module.exports = (req, res) =>{
  if(req.headers.statusheader === "Full"){
    let filePath = path.normalize(path.join(__dirname, '../content/status.html'))
    fs.readFile(filePath, (err,data) =>{
      if(err){
        console.log(err)
        res.writeHead(404);
        res.write('404 Not Found');
        res.end();
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      let moviesCount = database.movies.getAll().length
      data = data.toString().replace('{{replaceMe}}',`There are currently ${moviesCount} movies.`)
      res.write(data)
      res.end()
    })
  }else {
    return true;
  }
}