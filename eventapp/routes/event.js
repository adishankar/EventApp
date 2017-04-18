var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/:id', function(req, res, next) {

// console.log(req);
  var id = req.params.id;
// console.log(id);

  res.sendFile(path.resolve(__dirname + '/../views/event.html/'));
});

module.exports = router;