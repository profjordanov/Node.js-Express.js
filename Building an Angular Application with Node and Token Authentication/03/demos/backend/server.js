var express = require('express')
var cors = require('cors')
var app = express()

var posts = [
    {message: 'hello'},
    {message: 'hi'}
]

app.use(cors())

app.get('/posts', (req,res) => {
    res.send(posts)
})

app.listen(3000)