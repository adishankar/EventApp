var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/:orgname', function(req, res, next) {

  var orgname = req.params.orgname;
  console.log(orgname);

  res.sendFile(path.resolve(__dirname + '/../views/organization.html/'));
});

module.exports = router;