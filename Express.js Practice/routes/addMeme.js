var express = require('express');
var router = express.Router();

/* GET addMeme listing. */
router.get('/', function(req, res, next) {
  res.render('addMeme')
}).post('/', (req, res, next) =>{
  console.log(req.files)
})

module.exports = router;
