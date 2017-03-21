var express = require('express');
var router = express.Router();//declare router object

router.get('/', function(req, res){

    res.sendFile(__dirname + '/public/dashboard/dashboard.html');
});

module.exports = router;