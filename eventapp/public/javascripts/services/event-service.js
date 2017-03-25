angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        this.testEvent = function(){
            console.log("test event service");
        };

    }]);