var express = require('express');
var router = express.Router();

/* GET searchMeme listing. */
router.get('/', function(req, res, next) {
  res.render('searchMeme')
});

module.exports = router;
