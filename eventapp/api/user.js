var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let setUniQuery = `UPDATE user SET universityID = ? WHERE userID = ?;`;

function setUniversity(req, res){
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

            var query = mysql.format(setUniQuery, [req.body.universityId,req.body.userId]);
            console.log(query);

            sql.query(query, function(error, results, fields){
                if(error) throw error;
              // console.log(results);
                res.send(results);
                res.end();
            });

        }catch(exception){

        }
    }
}

exports.setUniversity = setUniversity;