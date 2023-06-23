var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user) {
    res.render('index', { title: 'Meme Central', user: req.user });
  } else {
    res.render('index', { title: 'Meme Central', user: null });
  }
});

module.exports = router;
