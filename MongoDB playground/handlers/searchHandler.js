const fs = require('fs')
const Tag = require('./../models/TagSchema')

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    console.log(req.pathquery)

    Tag.find({}).populate('images').then((data) =>{
      console.log(data)
      let images = []

      for(let tag of data){
        for(let elem of tag.images){
          images.push(elem.imageUrl)
        }
      }

      let uniquArray = images.filter(function (elem, pos) {
        return images.indexOf(elem) == pos
      })

      fs.readFile('./views/results.html',(err,html)=>{
        if(err){
          console.log(err)
          return
        }

        res.writeHead(200,{
          'Content-Type':'text/html'
        })
        let resultString = ''
        for(let singleImg of images){
          resultString += `<fieldset id => <legend>${singleImg.imageTitle}:</legend> 
<img src="${singleImg.imageUrl}">
</img><p>${singleImg.description}<p/>
<button onclick='location.href="/delete?id=${singleImg._id}"'class='deleteBtn'>Delete
</button> 
</fieldset>`
        }
        res.end(html.toString().replace('<div class=\'replaceMe\'></div>',resultString))
      })
    })
   
  } else {
    return true
  }
}
