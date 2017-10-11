const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-hbs')
const port = 1337
const app = express()
const path = require('path')

//Middleware usage
app.use(express.static('public'))
app.use(express.static('views'))

app.use((req, res, next) =>{
  console.log('TIme: '+ Date.now())
  next()
})

//
//app.get('/about/old', (req, res) =>{
//  res.redirect('/about')
//})
//
//app.get('/about', (req, res) =>{
//  res.send('ABOUT')
//})
//
//app.get('/file/:fileName', (req, res) =>{
//  let fileName = req.params.fileName
//  res.sendFile('D:\\Software University\\Node.js&Express.js\\Express.js&ViewEngines\\' + fileName)
//})

//app.get('/', (req, res) =>{
//  res.json({name: 'Pesho//'})
//})

//app.get('/pdf', (req, res) =>{
//  res.download('D:\\Software University\\Node.js&Express.js\\Express.js&ViewEngines\\course-schedule.pdf')
//})


//app.all('/', (req,res, next) =>{
//  console.log('Midleware')
//  next()
//}, (req, res) =>{
//  res.send('ALL')
//})
//
//app.get('/users/:userId(\\d+)', (req, res) =>{
//  let paramsObj = req.params
//  res.send(paramsObj)
//})

//app.get('/', (req, res) =>{
//  res.send('Welcome!')
//})
//
//app.post('/', (req, res) =>{
//  res.send('POST request on this page!')
//})
//
//app.put('/', (req, res) =>{
//  res.send('PUT request on this page!')
//})
//
//app.route('/home')
//  .get((req, res) =>{
//  res.send('GET request')
//  })
//  .post((req, res) =>{
//    res.send('POST request')
//  })
//  .put((req, res) =>{
//    res.send('PUT request')
//  })
//  .delete((req, res) =>{
//    res.send('DELETE request')
//  })
//  .all((req, res) =>{
//  res.send('ELSE')
//  })
//

app.listen(port, () => console.log(`Server running on ${port}`))