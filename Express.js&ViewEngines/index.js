const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-hbs')
const port = 1337
const app = express()
const path = require('path')

// Middleware usage
app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.static('views'))
app.use(bodyParser.urlencoded({ extended: true }))

// View Engine
app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, '/handlebars-views')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/handlebars-views'))

app.get('/test', (req, res) => {
  res.render('test', {
    myArray: [5, 4, 9, 10],
    isAdmin: true
  })
})

app.listen(port, () => console.log(`Server running on ${port}`))
