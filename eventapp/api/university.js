var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

//Get name and ID of all universities in DB (for signup page)
let selectIdAndName = "SELECT universityID,universityName FROM university";
//let selectAdminId = "SELECT superAdmin_superAdminID FROM university WHERE universityID = ?";
let selectAdminID = `SELECT userID FROM users WHERE universityID = ? AND userTypeId =
    (SELECT typeID 
    FROM useTypes 
    WHERE typeName = 'superAdmin')`
//Get Super Admin ID

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

function getUniversityAdmin(req, res){
    if(req && req.params)
        console.log(req.params);
        
    var sql = mysql.createConnection({
        host: db.db.host,
        user: db.db.user,
        password: db.db.password,
        database: db.db.database
    });

    try{
        var query = mysql.format(selectAdminId, [req.params.id]);

        sql.query(query, function(error, results, fields){
            // console.log("error:");
            // console.log(error);
            // console.log("results:");            
            // console.log(results);
            // console.log("fields:");
            // console.log(fields);
            console.log(results[0]);
            res.send(results[0]);
            if(res)
                res.end();

            return(results[0]);
        })

        //sql.destroy();
        //res.send()
        //return university id

    } catch(exception) {

    }
}

function getUniversityLocation(req, res){
    var deferred = $q.defer();

    if(req && req.params)
        console.log(req.params);
        
    var sql = mysql.createConnection({
        host: db.db.host,
        user: db.db.user,
        password: db.db.password,
        database: db.db.database
    });

    try{
        var query = mysql.format(selectLocationId, [req.params.id]);

        sql.query(query, function(error, results, fields){
            // console.log("error:");
            // console.log(error);
            // console.log("results:");            
            // console.log(results);
            // console.log("fields:");
            // console.log(fields);
            res.send(results[0]);
            if(res)
                res.end();
            
            deferred.resolve(results[0]);
            //return(results[0]);
        })

        return deferred.promise;

        //sql.destroy();
        //res.send()
        //return university id

    } catch(exception) {
        sql.destroy();
    }
}

exports.getAllUniversitiesId = getAllUniversitiesId;
exports.getUniversityAdmin = getUniversityAdmin;
exports.getUniversityLocation = getUniversityLocation;