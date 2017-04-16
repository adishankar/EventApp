var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let createNewEventQuery = `INSERT INTO event SET ?;`;
let getPublicQuery = `SELECT * FROM event WHERE eventTypeID = (
    SELECT eventTypeID FROM eventType
    WHERE eventTypeName LIKE 'public'    
);`
let getEventQuery = `SELECT * FROM event WHERE eventID = ?;`;
let commentQuery = `INSERT INTO comments SET ?;`
let getCommentsQuery = `SELECT c.comment, c.datePosted, concat(u.firstName,' ',u.lastName) as name, u.userID, c.commentID
    FROM comments c 
    INNER JOIN user u ON c.userID = u.userID 
    WHERE eventID = ? 
    ORDER BY datePosted DESC;`;

let deleteCommentQuery = `DELETE FROM comments WHERE commentID = ?;`;

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
        finally{
            //sql.destroy();
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
                    allDay: false,
                    url: "http://localhost:3000/event/" + i.eventID + "/"
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

function getEvent(req, res){
    console.log(req.params);
    console.log("Loading event: " + req.params.id);
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
        var query = mysql.format(getEventQuery, [req.params.id]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            console.log(error);
            if(error) throw error;
            
            console.log(results.length);
            if(results.length == 0){
                res.send("invalid");
                res.end();
                return;
            }
            console.log(results);
            var result = results[0]
            var ret = {
                id: result.eventID,
                title: result.eventName,
                start: result.eventStartDate,
                end: result.eventEndDate,
                description: result.eventDescription,
                locationId: result.locationID
            };
            console.log(ret);
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
            res.send(ret);
            res.end();
        })
    }catch(ex){

    }
}

function createComment(req, res){
    console.log('Starting comment creation');
    if(req && req.body){
        try{
            var sql = mysql.createConnection({
                host: db.db.host,
                user: db.db.user,
                password: db.db.password,
                database: db.db.database
            });
            console.log(req.body)
            var comment = {
                comment: req.body.comment,
                datePosted: new Date(),
                eventID: req.body.eventId,
                userID: req.body.userId
            };
            var query = mysql.format(commentQuery, comment);
            console.log(query);
            sql.query(query, function(error, results, fields){
                if(error) throw error;
                console.log(results);
                res.send(results);
                res.end();
            })
        }catch(ex){

        }
        finally{
            //sql.destroy();
        }
    }
}

function getComments(req, res){
    console.log(req.params);
    console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        console.log(req.params);
        var query = mysql.format(getCommentsQuery, [req.params.id]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            console.log(error);
            if(error) throw error;
            
            //console.log(results);
            if(results.length == 0){
                res.send("invalid");
                res.end();
                return;
            }
            console.log(results);
            var ret = [];
            for(var r of results){
                console.log(r);
                var temp = {
                    comment: r.comment,
                    datePosted: new Date(r.datePosted).toLocaleString(),
                    name: r.name,
                    userID: r.userID,
                    commentID: r.commentID
                }
                ret.push(temp);
            }
            res.send(ret);
            res.end();
        })
    }catch(ex){

    }
}

deleteComment = function(req, res){
    console.log(req.params);
    console.log(req.body);
    console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        console.log(req.params);
        var query = mysql.format(deleteCommentQuery, [req.params.id]);
        console.log(query);
        sql.query(query, function(error, results, fields){
            console.log(results);
            res.send(results);
        })
    }catch(ex){

    }
}

exports.createEvent = createEvent;
exports.getPublicEvents = getPublicEvents;
exports.getEvent = getEvent;
exports.createComment = createComment;
exports.getComments = getComments;
exports.deleteComment = deleteComment;