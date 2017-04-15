angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        var deferred = $q.defer();
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
            console.log(event);
            $http.post('http://localhost:3000/api/location', {
                locationName: event.location.name,
                locationLatitude: event.location.geometry.location.lat(),
                locationLongitude: event.location.geometry.location.lng()
            }).then( function(data){
                //console.log(data.data.insertId);
                //var now = new Date();
                console.log(event);
                // console.log(data);
                $http.post('http://localhost:3000/api/event', {
                    eventName: event.name,
                    eventDescription: event.description,
                    eventStartDate: (event.datetime),
                    eventEndDate: (event.enddatetime),
                    eventCategory: event.contactEmail,
                    location: data.data.insertId,
                    eventTypeId: event.isPublic ? 1 : 3,
                    rsoID: 1,
                    adminID: event.userId
                }).then( function(data){
                    console.log(data);
                    deferred.resolve(data);
                })
            })

            return deferred.promise;
        };

        this.getOrgEvents = function(orgName){
            var url = 'http://localhost:3000/organization/' + orgName.toString();
            $http.post(url, {
                type:'events',
                orgName: orgName.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.searchEvents = function(query){
            var url = 'http://localhost:3000/search/';
            $http.post(url, {
                type: 'event',
                query: query
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.getEvent = function(eventName){
            var url = 'http://localhost:3000/event/' + eventName.toString();
            $http.post(url, {
                type: 'getEvent',
                eventName: eventName.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
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

        this.makeComment = function(event, comment){

            //console.log(comment);
            //console.log(event);

            var url = 'http://localhost:3000/event/' + event.name.toString();
            $http.post(url, {
                type: 'comment',
                eventName: event.name.toString(),
                author: comment.author,
                comment: comment.comment
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

    }]);