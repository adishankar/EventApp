var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

// let createNewEventQuery = `INSERT INTO event SET ?;`;
// let getPublicQuery = `SELECT * FROM event WHERE eventTypeID = (
//     SELECT eventTypeID FROM eventType
//     WHERE eventTypeName LIKE 'public'    
// );`
// let getEventQuery = `SELECT * FROM event WHERE eventID = ?;`;
let getRsoEventsQuery = `SELECT * FROM event WHERE rsoID = ?;`;
let joinRsoQuery = `INSERT INTO rso_has_user SET ?;`;
let rsoDetailQuery = `SELECT * FROM rso where RSOID = ?;`
let checkIfInRSO = `SELECT * FROM rso_has_user WHERE rsoID = ? AND userID = ?;`
let getRsosQuery = `SELECT r.RSOname,ru.RSOid FROM rso_has_user ru INNER JOIN rso r ON r.RSOid = ru.RSOid WHERE userID = ?;`

function getRsoEvents(req, res){
    console.log(req.params);
    console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(getRsoEventsQuery, [req.params.id]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
            console.log(error);
            if(error) throw error;
            
            console.log(results.length);
            if(results.length == 0){
                res.send("no results");
                res.end();
                return;
            }
            console.log(results);
            var rets = []
            for(var r of results){
                var ret = {
                    id: r.eventID,
                    title: r.eventName,
                    start: r.eventStartDate,
                    end: r.eventEndDate,
                    description: r.eventDescription,
                    locationId: r.locationID
                };
                rets.push(ret)
            }
            
            console.log(rets);
            // for(var i of results){
            //     console.log(i);
            //     if(i.eventStartDate == null || i.eventEndDate == null)
            //         continue;
            //     var temp = {
            //         id: i.eventID,
            //         title: i.eventName,
            //         start: i.eventStartDate,
            //         end: i.eventEndDate,
            //         allDay: false
            //     };
            //     // temp.id = i.eventID;
            //     // temp.title = i.eventName;
            //     // temp.start = i.eventStartDate;
            //     // temp.end = i.eventEndDate;
            //     // temp.allDay = false;
            //     console.log(temp);
            //     ret.push(temp);
            // }
            res.send(rets);
            res.end();
        })
    }catch(ex){

    }
}

function getRsoDetailts(req, res){
    console.log(req.params);
    console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(rsoDetailQuery, [req.params.id]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
            console.log(error);
            if(error) throw error;
            
            console.log(results);
            console.log(results.length);
            // if(results.length == 0){
            //     res.send("no results");
            //     res.end();
            //     return;
            // }
            //console.log(results);
            
            res.send(results);
            res.end();
        })
    }catch(ex){

    }
}

function joinRso(req, res){
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });

        console.log(req);
        var rsoUser = {
            RSOid: req.body.org,
            userID: req.body.user
        };
        console.log(rsoUser);
        var query = mysql.format(checkIfInRSO, [rsoUser.RSOid, rsoUser.userID.toString()]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
            console.log(error);
            if(error){
                throw error;
                return;
            }            
            console.log(results.length);
            if(results.length == 0){
                var query2 = mysql.format(joinRsoQuery, rsoUser);
                console.log(query2);
                sql.query(query2, function(err, ress, fies){
                    console.log(ress);
                    res.send(ress);
                    res.end();
                })
                return;
            }
            // console.log(results);
            // res.send(results);
            // res.end();
        })
    }catch(ex){

    }
}

function isInRso(req, res){
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        //console.log(req);
        var query = mysql.format(checkIfInRSO, [req.params.rsoid, req.params.uid]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            if(results.length > 0){
                res.send(true);
                res.end();
                return;
            }
            res.send(false);
            res.end();
        });
    }catch(ex){

    }
}

function getRsos(req, res){
    console.log(req.params);
    console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(getRsosQuery, [req.params.id]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
            console.log(error);
            if(error) throw error;
            
            console.log(results.length);
            if(results.length == 0){
                res.send("no results");
                res.end();
                return;
            }
            console.log(results);
            var rets = []
            for(var r of results){
                var ret = {
                    id: r.RSOid,
                    name: r.RSOname,
                };
                rets.push(ret)
            }
            
            console.log(rets);
            // for(var i of results){
            //     console.log(i);
            //     if(i.eventStartDate == null || i.eventEndDate == null)
            //         continue;
            //     var temp = {
            //         id: i.eventID,
            //         title: i.eventName,
            //         start: i.eventStartDate,
            //         end: i.eventEndDate,
            //         allDay: false
            //     };
            //     // temp.id = i.eventID;
            //     // temp.title = i.eventName;
            //     // temp.start = i.eventStartDate;
            //     // temp.end = i.eventEndDate;
            //     // temp.allDay = false;
            //     console.log(temp);
            //     ret.push(temp);
            // }
            res.send(rets);
            res.end();
        })
    }catch(ex){

    }
}

exports.getRsoEvents = getRsoEvents;
exports.joinRso = joinRso;
exports.isInRso = isInRso;
exports.getRsoDetailts = getRsoDetailts;
exports.getRsos = getRsos;