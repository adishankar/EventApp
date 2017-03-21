var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/index.html', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('/views/index.html');
});*/

/* GET home page */
router.get('/', function(req, res, next) {
  res.sendFile('/home/adi/nodestuff/databases/EventApp/eventapp/views/index.html');
});

module.exports = router;
