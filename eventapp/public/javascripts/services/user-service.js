angular.module('userService',[])
    .service('userService', ['$http', '$q', '$window', function userService($http, $q, $window){
        
        var deferred = $q.defer();
        var userData;

        this.login = function(user){

            $http.post('http://localhost:3000/', {username: user.username.toString(),
            password: user.password.toString()}).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.setUserData = function(user){
            console.log("setting user in service");
            $window.localStorage['user'] = JSON.stringify(user);
        };

        this.getUserData = function(){
            return JSON.parse($window.localStorage['user']);
        };

        this.createUser = function(user){
            $http.post('http://localhost:3000/signup', {username: user.username.toString(),
            password: user.password.toString(),
            firstname: user.fName.toString(),
            lastname: user.lName.toString()}).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

    }]);
