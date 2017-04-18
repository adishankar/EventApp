angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        var deferred = $q.defer();
        var deferred2 = $q.defer();
        var def = $q.defer();
        var def2 = $q.defer();
        var def3 = $q.defer();
        var def4 = $q.defer();

        this.createEvent = function(event){
            // $http.post('http://localhost:3000/dashboard', {
            //     type: "event",
            //     eventName: event.name.toString(),
            //     eventLocation: event.location.toString(), 
            //     eventDesc: event.description.toString(),
            //     eventContactEmail: event.contactEmail.toString()
            // }).then( function(data){
            //     deferred.resolve(data);
            // })
          // console.log(event);
            if(!event.location){
                alert("Please choose a location on the map!");
                deferred.resolve("");
                return deferred.promise;
            }
            $http.post('http://localhost:3000/api/location', {
                locationName: event.location.name,
                locationLatitude: event.location.geometry.location.lat(),
                locationLongitude: event.location.geometry.location.lng()
            }).then( function(data){
                //console.log(data.data.insertId);
                //var now = new Date();
              // console.log(event);
                // console.log(data);
                $http.post('http://localhost:3000/api/event', {
                    eventName: event.name,
                    eventDescription: event.description,
                    eventStartDate: (event.datetime),
                    eventEndDate: (event.enddatetime),
                    eventCategory: event.contactEmail,
                    location: data.data.insertId,
                    eventTypeId: event.isPublic ? 1 : 3,
                    rsoID: event.rsoID,
                    adminID: event.userId
                }).then( function(data){
                  // console.log(data);
                    deferred.resolve(data);
                })
            })

            return deferred.promise;
        };

        this.getOrgEvents = function(orgName){
          // console.log(orgName);
            var url = 'http://localhost:3000/api/rso/getEvents/' + orgName.toString();
            $http.get(url, {
                orgId: orgName
            }).then( function(data){
              // console.log(data.data);
                if(data.data == "no results"){
                    deferred.resolve("No Events Currently");
                    return;
                }
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.searchEvents = function(query, user){
            def3 = $q.defer();
            var url = 'http://localhost:3000/api/events/search/';
            $http.post(url, {
                query: query,
                universityID: user.universityID
            }).then( function(data){
                def3.resolve(data);
            })

            return def3.promise;
        };

        this.getEvent = function(eventId){
            var url = 'http://localhost:3000/api/event/' + eventId.toString();
            $http.get(url, {
                eventId: eventId
            }).then( function(data){
              // console.log(data);
                deferred2.resolve(data);
            })

            return deferred2.promise;
        };

        this.getPublicEvents = function(){
            var url = 'http://localhost:3000/api/events/public';
            $http.get(url, {
                eventTypeId: 1
            }).then(function (data){
              console.log(data.data)
                deferred.resolve(data.data);
            })
            return deferred.promise;
        }

        this.makeComment = function(event, comment, user){

            //console.log(comment);
            //console.log(event);
            //var user = userSerivce.getUserData();
          // console.log(user);
            var url = 'http://localhost:3000/api/event/comments/' + event.id.toString();
            $http.post(url, {
                //eventName: event.name.toString(),
                eventId: event.id,
                author: user.firstName + " " + user.lastName,
                comment: comment.comment,
                userId: user.userID
            }).then( function(data){
              // console.log(data);
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.getComments = function(eventId){
            var url = 'http://localhost:3000/api/event/comments/' + eventId.toString();
            $http.get(url, {
                eventId: eventId
            }).then(function(data){
              // console.log("hello");
              // console.log(data.data);
                def.resolve(data.data);
            })
            return def.promise;
        }

        this.getLocation = function(eventId){
            var url = 'http://localhost:3000/api/location/' + eventId.toString();
            $http.get(url, {eventId: eventId}).then(function(data){
              // console.log("Here");
              // console.log(data);
                def4.resolve(data);
            });
            return def4.promise;
        }

        this.deleteComment = function(commentID){
            var url = 'http://localhost:3000/api/event/comments/' + commentID.toString();
            $http.delete(url, {commentID:commentID})
                .then(function(data){
                  // console.log(data);
                    def2.resolve(data);
                })
            return def2.promise;
        }

    }]);