var sqlqs = require('../sqlqueries');
var mysql = require('mysql');
var db = require('../config');

let getRsoEventsQuery = `SELECT * FROM event WHERE rsoID = ?;`;
let joinRsoQuery = `INSERT INTO rso_has_user SET ?;`;
let rsoDetailQuery = `SELECT * FROM rso where RSOID = ?;`
let checkIfInRSO = `SELECT * FROM rso_has_user WHERE rsoID = ? AND userID = ?;`
let getRsosQuery = `SELECT r.RSOname,ru.RSOid FROM rso_has_user ru INNER JOIN rso r ON r.RSOid = ru.RSOid WHERE userID = ?;`
let searchRsosQuery = `SELECT RSOid, RSOdescription, RSOname 
    FROM RSO
    WHERE ((RSOname LIKE ?) OR ( RSOdescription LIKE ?)) AND (universityID = ?);`;
let createRsoQuery = `INSERT INTO RSO SET ?;`;
let deleteRsoQuery = `DELETE FROM RSO WHERE RSOid = ?;`;

function getRsoEvents(req, res){
    // console.log(req.params);
  // console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(getRsoEventsQuery, [req.params.id]);
        // console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
            // console.log(error);
            if(error) throw error;
            
            // console.log(results.length);
            if(results.length == 0){
                res.send("no results");
                res.end();
                return;
            }
            // console.log(results);
            var rets = []
            for(var r of results){
                var ret = {
                    id: r.eventID,
                    title: r.eventName,
                    start: r.eventStartDate,
                    end: r.eventEndDate,
                    description: r.eventDescription,
                    locationId: r.locationID,
                    allDay: false,
                    url: "http://localhost:3000/event/" + r.eventID + "/"
                };
                rets.push(ret)
            }
            
            // console.log(rets);

            res.send(rets);
            res.end();
        })
    }catch(ex){

    }
}

function getRsoDetailts(req, res){
    // console.log(req.params);
    // console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(rsoDetailQuery, [req.params.id]);
        // console.log(query);
        sql.query(query, function(error, results, fields){
            // console.log(error);
            if(error) throw error;
            
            // console.log(results);
            // console.log(results.length);
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

        //console.log(req);
        var rsoUser = {
            RSOid: req.body.org || req.params.rsoid,
            userID: req.body.user || req.params.uid
        };
        //console.log(rsoUser);
        var query = mysql.format(checkIfInRSO, [rsoUser.RSOid, rsoUser.userID.toString()]);
        //console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
          // console.log(error);
            if(error){
                throw error;
                return;
            }            
          // console.log(results.length);
            if(results.length == 0){
                var query2 = mysql.format(joinRsoQuery, rsoUser);
              // console.log(query2);
                sql.query(query2, function(err, ress, fies){
                  // console.log(ress);
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
      // console.log(query);
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
  // console.log(req.params);
  // console.log("Loading event: " + req.params.id);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(getRsosQuery, [req.params.id]);
      // console.log(query);
        sql.query(query, function(error, results, fields){
            //TODO: Format the results according to: https://fullcalendar.io/docs/event_data/Event_Object/ 
          // console.log(error);
            if(error) throw error;
            
          // console.log(results.length);
            if(results.length == 0){
                res.send("no results");
                res.end();
                return;
            }
          // console.log(results);
            var rets = []
            for(var r of results){
                var ret = {
                    id: r.RSOid,
                    name: r.RSOname
                };
                rets.push(ret)
            }
            
          // console.log(rets);
            res.send(rets);
            res.end();
        })
    }catch(ex){

    }
}

searchRsos = function(req, res){

    var modifiedInput = mysql.format('?', req.body.query);
    modifiedInput = '%' + modifiedInput.substring(1,modifiedInput.length-1) + '%';
  // console.log(modifiedInput);
    //var querystring = searchEventsQuery.replace(/0/g, test);
    //console.log(querystring);
    //console.log(req.body);
    try{
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(searchRsosQuery, [modifiedInput,modifiedInput, req.body.universityID]);
      // console.log(query);
        sql.query(query, function(error, results, fields){
            //console.log(error);
          // console.log(results);
            //console.log(fields);
            if(results.length == 0){
                res.send("none");
                res.end();
                return;
            }
            var rets = [];
            for(var r of results){
                var ret = {
                    id:r.RSOid,
                    name:r.RSOname,
                    description:r.RSOdescription
                };
                rets.push(ret);
            }
          // console.log(rets);
            res.send(rets);
            res.end();
        })
    }catch(ex){

    }
}

function createRso(req, res){
    if(req && req.body){
		var newRso = {RSOname: req.body.rsoName,
			adminID: req.body.adminId,
            RSOdescription: req.body.rsoDesc,
			universityID: req.body.universityId};
      // console.log(req.body);
		//console.log("are we here?");
        console.log(newRso);
        if(!newRso.RSOname || !newRso.adminID || !newRso.RSOdescription || !newRso.universityID){
            res.send("Missing details");
            res.end();
            return;
        }
        try{
            var sql = mysql.createConnection({
                host: db.db.host,
                user: db.db.user,
                password: db.db.password,
                database: db.db.database
            });

            let query = mysql.format(createRsoQuery, newRso);

          // console.log(query);
            sql.connect(function(err) {
                if(err){
                  // console.log('error connecting to db',err.stack);
                    return;
                }
              // console.log('connected as id: ' + sql.threadId);
            });

            sql.query(query, function(error, results, fields){
                if(error) throw error;
              // console.log(error);
              // console.log(results);
                //console.log(fields);
              // console.log(results.length);
                res.send(results);
                res.end();
            });
        }catch(ex){
            //failed
        }
		
		//if(done)
		//	return;
		//create new user
		
	}
}

deleteRso = function(req, res){
    try{
        console.log(req.params);
        var sql = mysql.createConnection({
            host: db.db.host,
            user: db.db.user,
            password: db.db.password,
            database: db.db.database
        });
        var query = mysql.format(deleteRsoQuery, [req.params.id]);
      // console.log(query);
        sql.query(query, function(error, results, fields){
            console.log(error);
            console.log(results);
            res.send(results);
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
exports.searchRsos = searchRsos;
exports.createRso = createRso;
exports.deleteRso = deleteRso;