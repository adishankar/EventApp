var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let createNewEventQuery = `INSERT INTO event SET ?;`;
let getPublicQuery = `SELECT * FROM event WHERE eventTypeID = (
    SELECT eventTypeID FROM eventType
    WHERE eventTypeName LIKE 'public'    
);`

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
            console.log(req.body)
            var event = {
                eventName: req.body.eventName,
                eventStartDate: req.body.eventStartDate,
                eventEndDate: req.body.eventEndDate,
                eventDescription: req.body.eventDescription,
                eventCategory: req.body.eventCategory,
                locationID: req.body.location,
                eventTypeID: req.body.eventTypeId,
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

function getPublicEvents(req, res){
    console.log("Loading public events");
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        // var event = {
        //     eventName: req.body.eventName,
        //     eventDate: req.body.eventDate,
        //     eventDescription: req.body.eventDescription,
        //     eventCategory: req.body.eventCategory,
        //     locationID: req.body.location,
        //     rsoID: req.body.rsoID,
        //     adminID: req.body.adminID
        // };
        var query = mysql.format(getPublicQuery);
        console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
            if(error) throw error;
            var ret = [];
            console.log(results.length);
            console.log(results);
            for(var i of results){
                console.log(i);
                if(i.eventStartDate == null || i.eventEndDate == null)
                    continue;
                var temp = {
                    id: i.eventID,
                    title: i.eventName,
                    start: i.eventStartDate,
                    end: i.eventEndDate,
                    allDay: false
                };
                // temp.id = i.eventID;
                // temp.title = i.eventName;
                // temp.start = i.eventStartDate;
                // temp.end = i.eventEndDate;
                // temp.allDay = false;
                console.log(temp);
                ret.push(temp);
            }
            res.send(ret);
            res.end();
        })
    }catch(ex){

    }
}

exports.createEvent = createEvent;
exports.getPublicEvents = getPublicEvents;