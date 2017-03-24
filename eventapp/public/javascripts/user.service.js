angular.module('userService',[])
    .service('userService', ['$http', '$q', function userService($http, $q){
        
        var deferred = $q.defer();
        $http.get('people.json').then(function (data){
            deferred.resolve(data);
        });

        this.getPeople = function(){
            console.log("service test");
            return deferred.promise;
        }

    }]);
