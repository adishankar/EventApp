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
var seach = require('./routes/search');

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
app.use('/search', seach);

var userCount = 0;
var username = 'user';
var password = 'pass';
var users = [{username: "user",
            password: 'pass',
            userID: 0,
            uni:'testUni'}];

var orgs = {org1: {name: "org1", description: "org1 description"}, org2: {name: "org2", description: "org2 description"},
        org3: {name: "org3", description: "org3 description"},org4: {name: "org4", description: "org4 description"}};



var events = [{name: "event1", description: "event1 description", comments: [{author: "user1", comment:"user1 comment"}, {author: "user2", comment:"user2 comment"}]},
        {name: "event2", description: "event2 description", comments: []},
        {name: "event3", description: "event3 description", comments: []},
        {name: "event4", description: "event4 description", comments: []},
        {name: "event5", description: "event5 description", comments: []},
        {name: "event6", description: "event6 description", comments: []},
        {name: "event7", description: "event7 description", comments: []}
    ];

var universities = [
        {
          name:"testUni",
          location: "test",
          description: "test",
          numStudents: 1
        }
    ];


//login POST
app.post('/', function(req, res){
  console.log(req.body);
  
  var currentUser = verifyUser(req.body);
  console.log('current user');
  console.log(currentUser);

  res.send(currentUser);
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

//get events for an organization
app.post('/organization/:orgname', function(req, res){

  res.send(events);
})

//get event details for singe event
app.post('/event/:eventname', function(req, res){

  if (req.body.type == 'getEvent'){
    var eventName = req.body.eventName;
    console.log(eventName);
    //console.log(events.event1);
    var index = findEvent(req.body);

    res.send(events[index]);
  }

  if (req.body.type == 'comment'){
    console.log('commenting');
    var index = findEvent(req.body);
    events[index].comments.push({author:req.body.author, comment:req.body.comment});

    res.send(events[index].comments);
  }

  if (req.body.type == 'uni'){
    console.log('creating university');

    res.send('creating university');
  }
  
})


//user creation POST
app.post('/signup', function(req, res){
  console.log(req.body);
  userCount++;
  var newUser = {username: req.body.username,
              password: req.body.password,
              userID:userCount};

  

  users.push(newUser);
  
  res.send(newUser);

  console.log("new user created");
  console.log(users);

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


function verifyUser(user){
  
  for (var i=0; i<users.length; i++){
    if ((user.username == users[i].username) && (user.password == users[i].password)){
      console.log('logging in user:');
      console.log(users[i]);
      return users[i];
    }
  }

}

function findEvent(event){

  for (var i=0; i<events.length; i++){
    if (event.eventName == events[i].name){
      console.log("found event");
      return i;
    }
  }

}


module.exports = app;
