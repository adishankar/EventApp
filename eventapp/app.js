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
var createUni = require('./routes/createUni');
var createEvent = require('./routes/createEvent');
var easteregg = require('./routes/easteregg');

var mysql = require('mysql');
var db = require('./config');

var api = require('./api/api');

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
app.use('/rso', organization);
app.use('/event', event);
app.use('/search', seach);
app.use('/createUni', createUni);
app.use('/createEvent', createEvent);
app.use('/createEvent/:id', createEvent);
app.use('/easteregg', easteregg);

//create event or organization POST also using this to get joined orgs
app.post('/dashboard', function(req, res){
// console.log(req.body);

  if (req.body.type == "orgRequest"){
    res.send(orgs);
  }

  //logic here to place created object

  res.end('event or org creation response');
})

//get events for an organization
// app.post('/rso/:id', function(req, res){

//   //if (req.body.type == 'events')
//     res.send(events);

//   // else if (req.body.type == 'joinOrg'){
//   //   for (var i=0; i<users.length; i++){
//   //     if (users[i].username == req.body.user.toString()){
//   //     // console.log('adding ' + req.body.org + ' to user ' + users[i].username);
//   //       users[i].orgs.push(req.body.org);
//   //       res.send(users[i].orgs);
//   //       return;
//   //     }
//   //   }
//   // }
// });

// //get event details for singe event
// app.post('/event/:id', function(req, res){

//   // if (req.body.type == 'getEvent'){
//     var id = req.body.id;
//   // console.log(id);
//     //console.log(events.event1);
//     var index = findEvent(id);

//     res.send(events[index]);
//   // }

//   // if (req.body.type == 'comment'){
//   // // console.log('commenting');
//   //   var index = findEvent(req.body);
//   //   events[index].comments.push({author:req.body.author, comment:req.body.comment});

//   //   res.send(events[index].comments);
//   // }

//   // if (req.body.type == 'uni'){
//   // // console.log('creating university');

//   //   res.send('creating university');
//   // }
  
// });

//SQL Command to insert new user
// let signupQuery = `INSERT INTO user (firstName, lastName, emailAddress, password, userTypeID) Values
// (?,?,?,?,?);`;
//Login Api
app.post('/api/login', api.loginApi.login);
//create new university
app.post('/api/university', api.universityApi.createUniversity);
//get university sa id (based on universityID)
app.get('/api/university/admin/:id',api.universityApi.getUniversityAdmin);

app.get('/api/university/location/:id', api.universityApi.getUniversityLocation);

app.post('/api/rsos',api.rsoApi.createRso);
//get joined RSOs by User ID
app.get('/api/rsos/getJoined/:id', api.rsoApi.getRsos);

app.get('/api/rso/getEvents/:id', api.rsoApi.getRsoEvents);

app.get('/api/rso/:rsoid/:uid', api.rsoApi.isInRso);

app.get('/api/rso/:id', api.rsoApi.getRsoDetailts);

app.post('/api/rso/join/:rsoid/:uid', api.rsoApi.joinRso);

app.delete('/api/rso/:id', api.rsoApi.deleteRso);

app.get('/api/event/:id', api.eventApi.getEvent);
//create new event
app.post('/api/event', api.eventApi.createEvent);

app.get('/api/location/:id', api.locationApi.getLocation);
//Get public all public events
app.get('/api/events/public', api.eventApi.getPublicEvents);
//create new location
app.post('/api/location', api.locationApi.createLocation);
//sign up (create new user)
app.post('/api/signup', api.signupApi.signup);
//set univesrityID on superadmin
app.post('/api/user/setUniversity', api.userApi.setUniversity);

app.post('/api/event/comments/:id', api.eventApi.createComment);

app.get('/api/event/comments/:id', api.eventApi.getComments);

app.delete('/api/event/comments/:id', api.eventApi.deleteComment);
// app.post('/signup', function(req, res){
// // console.log(req.body);
//   userCount++;
//   var newUser = {username: req.body.username,
//               password: req.body.password,
//               userID:userCount};

//   var sql = mysql.createConnection({
//     host: db.db.host,
//     user: db.db.user,
//     password: db.db.password,
//     database: db.db.database
//   });

//   sql.connect(function(err) {
//     if(err){
//     // console.log('error connecting to bd',err.stack);
//       return;
//     }
//   // console.log('connected as id: ' + sql.threadId);
//   });

//   sql.end();

//   //users.push(newUser);
  
//   res.send(newUser);

// // console.log("new user created");
// // console.log(users);

//   res.end('user creation response');
// })
app.post('/api/rsos/search', api.rsoApi.searchRsos);
app.post('/api/events/search', api.eventApi.searchEvents);

//search page POST
app.post('/search', function(req, res){
  
  if (req.body.type == 'event'){
  // console.log('sending event search');
    var results = searchEvent(req.body.query);
    if(results == null){
      res.send("No Results");
    }else{
      res.send(results);
    }
  }
  if (req.body.type == 'org'){
  // console.log('sending org search');
    var results = searchOrg(req.body.query);
    if(results == null){
      res.send("No Results");
    }else{
      res.send(results);
    }
  }
})

app.use('/api/university', api.universityApi.getAllUniversitiesId);


/** All API endpoints must appear before this line!! */

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

// function verifyUser(user){
// // console.log('verifying user');
//   for (var i=0; i<users.length; i++){
//     if ((user.username == users[i].username) && (user.password == users[i].password)){
//     // console.log('logging in user:');
//     // console.log(users[i]);
//       return users[i];
//     }
//   }

// }

function findEvent(event){


  // for (var i=0; i<events.length; i++){
  //   if (event.eventName == events[i].name){
  //   // console.log("found event");
  //     return i;
  //   }
  // }

}

//lol temporary search function
function searchEvent(query){
  
  var eventResults = [];

  for (var i=0; i<events.length; i++){
    if (events[i].name == query.toString())
      eventResults.push(events[i]);
  }
  if(eventResults.length == 0){
    return null;
  }

  return eventResults;
}

//lol temporary search function part 2
function searchOrg(query){
  
  var orgResults = [];

  return null;
  for (var i=0; i<orgs.length; i++){
    //sql search for organization
    if (orgs[i].name == query.toString())
      orgResults.push(orgs[i]);
  }

  if(orgResults.length == 0){
    return null;
  }

  return orgResults;
}


module.exports = app;
