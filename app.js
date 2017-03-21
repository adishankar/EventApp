var express = require('express');
var app = express();


//set port to listen on
app.set('port', process.env.PORT || 3000);
//allow routes to have access to appData


//make public folder available
app.use(express.static('testapp/public'));
//use routes from routes folder
app.use(require('./routes/index'));

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});