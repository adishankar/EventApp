var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('/home/adi/nodestuff/databases/EventApp/eventapp/views/index.html');
});

module.exports = router;
