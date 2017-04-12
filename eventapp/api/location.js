var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let checkExistingLocation = `SELECT * FROM location WHERE locationName = ? AND locationLatitude LIKE ? AND locationLongitude LIKE ?;`;
let createNewLocationQuery = `INSERT INTO location SET ?;`;

function createLocation(req, res){
    console.log("starting event creation");
    if(req &&req.body){
        try{
            var sql = mysql.createConnection({
                host: db.db.host,
                user: db.db.user,
                password: db.db.password,
                database: db.db.database
            });
            var loc = {
                locationName: req.body.locationName,
                locationLatitude: req.body.locationLatitude,
                locationLongitude: req.body.locationLongitude
            };
            var query = mysql.format(checkExistingLocation, [loc.locationName, loc.locationLatitude, loc.locationLongitude]);
            console.log(query);
            sql.query(query, function(error, results, fields){
                if(error) throw error;
                console.log(results);
                if(results){
                    query = mysql.format(createNewLocationQuery, loc);
                    console.log(query);
                    sql.query(query, function(error, results, fields){
                    if(error) throw error;
                    console.log(results);
                    res.send(results);
                    res.end();
            })
                }
            })
            query = mysql.format(createNewLocationQuery, loc);
            console.log(query);
            sql.query(query, function(error, results, fields){
                if(error) throw error;
                console.log(results);
                res.send(results);
                res.end();
            })
        }catch(ex){

        }
    }
}

exports.createLocation = createLocation;
