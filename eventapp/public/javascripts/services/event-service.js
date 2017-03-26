angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        var deferred = $q.defer();
        this.createEvent = function(event){
            $http.post('http://localhost:3000/dashboard', {
                type: "event",
                eventName: event.name.toString(),
                eventLocation: event.location.toString(), 
                eventDesc: event.description.toString(),
                eventContactEmail: event.contactEmail.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.getOrgEvents = function(orgName){
            var url = 'http://localhost:3000/organization/' + orgName.toString();
            $http.post(url, {
                orgName: orgName.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.getEvent = function(eventName){
            var url = 'http://localhost:3000/event/' + eventName.toString();
            $http.post(url, {
                eventName: eventName.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

    }]);