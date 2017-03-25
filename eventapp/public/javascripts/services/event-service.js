angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        var deferred = $q.defer();
        this.createEvent = function(event){
            $http.post('http://localhost:3000/dashboard', {
                eventName: event.name.toString(),
                eventLocation: event.location.toString(), 
                eventDesc: event.description.toString(),
                eventContactEmail: event.contactEmail.toString()
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

    }]);