var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let selectIdAndName = "SELECT universityID,universityName FROM university";

//GET /api/university
function getAllUniversitiesId(req, res) {
    console.log("test");
    var sql = mysql.createConnection({
        host: db.db.host,
        user: db.db.user,
        password: db.db.password,
        database: db.db.database
    });

    //let query = mysql.format(signupQuery, newUser);
    let query = mysql.format(selectIdAndName);
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
        //console.log(error);
        var ret = [];
        for(var uni of results)
        {
            ret.push(uni);
            //console.log(JSON.stringify(uni));
        }
        console.log(JSON.stringify(ret));
        res.send(ret);
        if(res)
            res.end("got universities. maybe?");
        //console.log(results);
        //console.log(fields);
    });

    sql.end();

    
}

exports.getAllUniversitiesId = getAllUniversitiesId;