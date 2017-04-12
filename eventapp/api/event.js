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
            var event = {
                eventName: req.body.eventName,
                eventDate: req.body.eventDate,
                eventDescription: req.body.eventDescription,
                eventCategory: req.body.eventCategory,
                location_locationID: req.body.location,
                rsoID: req.body.rsoID,
                adminID: req.body.adminID
            };
            var query = mysql.format(createNewEventQuery, event);
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

exports.createEvent = createEvent;