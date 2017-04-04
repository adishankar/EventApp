var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let createNewEventQuery = `INSERT INTO event SET ?;`;

function createEvent(req,res){
    console.log('Starting create new event');
    if(req && req.body){
        try{
            var sql = mysql.createConnection({
                host: db.db.host,
                user: db.db.user,
                password: db.db.password,
                database: db.db.database
            });
            var event = req.body;
            var query = mysql.format(createNewEventQuery, [event.eventName, 
                event.eventDate,
                event.eventCategory, 
                event.eventDescription,
                event.locationID,
                event.rsoID,
                event.adminID])

            sql.query(query, function(error, results, fields){
                console.log(results);
            })
        }catch(ex){

        }
    }
}