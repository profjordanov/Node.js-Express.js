var express = require('express');
var router = express.Router();

/* GET viewAll listing. */
router.get('/', function(req, res, next) {
  res.render('viewAllMemes', {memeCollection: ''})
});

module.exports = router;
