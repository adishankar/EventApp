var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

//SQL Command to insert new user
let signupQuery = `INSERT INTO user SET ?;`;
let newStudentQuery = `INSERT INTO student SET ?;`;
let newSaQuery = `INSERT INTO superAdmin SET ?;`;
//user creation POST

//TODO: check that the data exists before pushing it to the db.

//Usage: localhost:3000/api/signup
//Required params: firstName, lastName, username, password, userTypeID
//note: username should be an email address, but is not enforced
function signup(req, res){
	var uid = -1;
	console.log("Made it to the api");
	if(req && req.body)
		console.log(req.body);
	// userCount++;
	if(req && req.body){
		var newUser = {firstName: req.body.firstName,
			lastName: req.body.lastName,
			emailAddress: req.body.emailAddress,
			password: req.body.password,
			userTypeID: req.body.userTypeID};
		console.log("are we here?");

		var sql = mysql.createConnection({
			host: db.db.host,
			user: db.db.user,
			password: db.db.password,
			database: db.db.database
		});

		let query = mysql.format(signupQuery, newUser);
		console.log(query);
		sql.connect(function(err) {
			if(err){
			console.log('error connecting to db',err.stack);
			return;
			}
			console.log('connected as id: ' + sql.threadId);
		});

		sql.query(query, function(error, results, fields){
			//What to do here?
			//maybe nothing
			console.log(error);
			console.log(results);
			console.log(fields);
			uid = results.insertId;
		});

		//Are we an student, or a sa?
		switch(req.body.userTypeID){
			//sa
			case 1:
				//insert new sa;			
				var id = sql.query(sqlsq.lastId);
				console.log(id);
				// var saInfo = {

				// }
				// query = mysql.format(newSaQuery, saInfo);
				// sql.query(query);
				break;
			case 3:
				//insert new student;
				break;
			default:
				break;
		}

		sql.end();
		//users.push(newUser);
		
		res.send(newUser);
	}
	

	console.log("new user created");
	//console.log(users);
	if(res)
		res.end('user creation response');
}
//to be user in app.js
// app.post('/signup', function(req, res){
  
// })

//Do Export at end
exports.signup = signup;