var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let checkUserPass = `SELECT * FROM user WHERE emailAddress = ? AND password = ?;`;

function login(req, res){
    var uid = -1;
  // console.log("Starting login request");
    if(req && req.body){
        // var userObj = {
        //     emailAddress: req.body.emailAddress,
        //     password: req.body.password
        // };
        try{
            var sql = mysql.createConnection({
                host: db.db.host,
                user: db.db.user,
                password: db.db.password,
                database: db.db.database
            });

            var query = mysql.format(checkUserPass, [req.body.username,req.body.password]);
            // console.log(query);

            sql.query(query, function(error, results, fields){
                if(error) throw error;
                // console.log(results);
                if(results.length > 0){
                    //user exists, return user object.
                    // console.log(results[0]);
                    res.send(results[0]);
                } else{
                    // console.log("hi");
                    res.send(null);
                }
            });

        }catch(exception){

        }
    }
}

exports.login = login;