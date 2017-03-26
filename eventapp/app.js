var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
var signup = require('./routes/signup');
var organization = require('./routes/organization');
var event = require('./routes/event');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/dashboard', dashboard);
app.use('/signup', signup);
app.use('/organization', organization);
app.use('/event', event);

var username = 'user';
var password = 'pass';
var user = {username: "user",
            password: 'pass',
            userID: 123};

var orgs = {org1: {name: "org1", description: "org1 description"}, org2: {name: "org2", description: "org2 description"},
        org3: {name: "org3", description: "org3 description"},org4: {name: "org4", description: "org4 description"}};

var events = {event1: {name: "event1", description: "event1 description"},event2: {name: "event2", description: "event2 description"},
        event3: {name: "event3", description: "event3 description"},event4: {name: "event4", description: "event4 description"},
        event5: {name: "event5", description: "event5 description"},event6: {name: "event6", description: "event6 description"},
        event7: {name: "event7", description: "event7 description"}};

//login POST
app.post('/', function(req, res){
  console.log(req.body);

  if ((req.body.username == username) && (req.body.password == password)){
    console.log('verified user');
  }

  res.send(user);
  res.end('login response');
})

//create event or organization POST also using this to get joined orgs
app.post('/dashboard', function(req, res){
  console.log(req.body);

  if (req.body.type == "orgRequest"){
    res.send(orgs);
  }

  //logic here to place created object

  res.end('event or org creation response');
})

app.post('/organization/:orgname', function(req, res){

  res.send(events);
})

//user creation POST
app.post('/signup', function(req, res){
  console.log(req.body);

  res.end('user creation response');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
