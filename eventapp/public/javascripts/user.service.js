angular.module('userService',[])
    .service('userService', ['$http', '$q', function userService($http, $q){
        
        var deferred = $q.defer();

        this.login = function(user){

            $http.post('http://localhost:3000/', {username: user.username.toString(),
            password: user.password.toString()}).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        }

        this.getPeople = function(){
            console.log("service test");
            return deferred.promise;
        }

    }]);
