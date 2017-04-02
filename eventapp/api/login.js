var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let checkUserPass = `SELECT * FROM user WHERE emailAddress = ? AND password = ?;`;

function login(req, res){
    var uid = -1;
    
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

            var query = mysql.format(checkUserPass, [req.body.emailAddress,req.body.password], function(error, results, fields){
                if(error) throw error;
                if(results.count > 0){
                    //user exists, return user object.
                }
            });
        }catch(exception){

        }
    }
}

exports.login = login;