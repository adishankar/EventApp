var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');
var universityApi = require('./api').universityApi;
var http = require('http');

//SQL Command to insert new user
let signupQuery = `INSERT INTO user SET ?;`;
let checkExisting = `SELECT * FROM user WHERE firstName like ? AND lastName like ? AND emailAddress like ?;`;
//user creation POST

//TODO: check that the data exists before pushing it to the db.

//Usage: localhost:3000/api/signup
//Required params: firstName, lastName, username, password, userTypeID
//note: username should be an email address, but is not enforced
function signup(req, res){
	var uid = -1;
	//var done = false;
	//console.log("Made it to the api");
	// if(req && req.body)
	// 	console.log(req.body);
	// userCount++;
	if(req && req.body){
		var newUser = {firstName: req.body.firstName,
			lastName: req.body.lastName,
			emailAddress: req.body.emailAddress,
			password: req.body.password,
			userTypeID: req.body.userTypeID,
			universityID: req.body.universityID};
		//console.log("are we here?");

		var sql = mysql.createConnection({
			host: db.db.host,
			user: db.db.user,
			password: db.db.password,
			database: db.db.database
		});

		//check if user already exists,if so return a message and bring to login page.
		let query = mysql.format(checkExisting, [req.body.firstName, req.body.lastName, req.body.emailAddress]);

		console.log(query);
		sql.connect(function(err) {
			if(err){
				console.log('error connecting to db',err.stack);
				return;
			}
			console.log('connected as id: ' + sql.threadId);
		});

		sql.query(query, function(error, results, fields){
			console.log(error);
			console.log(results);
			//console.log(fields);
			console.log(results.length);
			if(results.length > 0){
				console.log("existing");
				res.send('existing');
				res.end();
				//done = true;
				//return;
			}
			else{
				sqlCreateUser(req,res, sql, newUser, uid);
			}
		});
		//if(done)
		//	return;
		//create new user
		
	}
	
	//if(done)
		//return;

	//console.log("new user created");
	//console.log(users);
	//if(res)
		//res.end('user creation response');
}
//to be user in app.js
// app.post('/signup', function(req, res){
  
// })
function sqlCreateUser(req, res, sql, newUser, uid){
	try{
		var query = mysql.format(signupQuery, newUser);
		console.log("query2: " + query);
		sql.query(query, function(error, results, fields){
			//What to do here?
			//maybe nothing
			console.log(error);
			console.log(results);
			console.log(fields);
			uid = results.insertId;
			console.log(uid);
			res.send(newUser);
			// if(results){
			// 	setRelation(req, res, sql, newUser, uid)
			// }
		});
	}catch(exception){

	}
}

// function setRelation(req, res, sql, newUser, uid){

// 	try{
// 		console.log("Usertype: " + req.body.userTypeID);
// 		//Are we an student, or a sa?
// 		switch(req.body.userTypeID){
// 			//sa
// 			case 1:
// 				//insert new sa;			
// 				var id = uid;
// 				console.log(id);
// 				var saInfo = {
// 					superAdminID: id
// 				}
// 				query = mysql.format(newSaQuery, saInfo);
// 				sql.query(query);
// 				break;
// 			case 3:
// 				//insert new student;
// 				console.log("here");
// 				var id = uid;
// 				console.log(id);
// 				http.get('http://localhost:3000/api/university/admin/' + req.body.universityID, function(res){
// 					//console.log(res);
// 					var bodyChunks = [];
// 					res.on('data', function(chunk) {
// 						// You can process streamed parts here...
// 						bodyChunks.push(chunk);
// 					}).on('end', function() {
// 						var body = Buffer.concat(bodyChunks);
// 						console.log('BODY: ' + body);
// 						// ...and/or process the entire body here.
// 					});
// 				});
// 				//console.log(uniServ.getUniversityAdmin(req.body.university));
// 				//console.log(universityApi.getAllUniversityAdmin({params:req.body.university}, res));
// 				// var studentInfo = {
// 				// 	studentID: id,
// 				// 	university_universityID: req.body.university,
// 				// 	university_superAdmin_superAdminID: universityApi.getUniversityAdmin().superAdmin_superAdminID,
// 				// 	university_location_locationID: universityApi.getUniversityLocation().location_locationID
// 				// };
// 				// console.log(studentInfo);
// 				break;
// 			default:
// 				break;
// 		}

// 		sql.end();
// 		//users.push(newUser);
		
// 		res.send(newUser);
// 	}catch(ex){

// 	}
// }

//Do Export at end
exports.signup = signup;