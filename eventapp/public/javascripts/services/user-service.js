angular.module('userService',[])
    .service('userService', ['$http', '$q', '$window', function userService($http, $q, $window){
        
        var deferred = $q.defer();
        var userData;

        this.login = function(user){
            console.log(user);
            $http.post('http://localhost:3000/api/login', {username: user.username.toString(),
            password: user.password.toString()}).then( function(data){
                console.log("userservice");
                console.log(data);
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.setUserData = function(user){
            $window.localStorage.removeItem('user');
            console.log("setting user in service");
            $window.localStorage['user'] = JSON.stringify(user);
        };

        this.getUserData = function(){
            return JSON.parse($window.localStorage['user']);
        };

        this.createUser = function(user){
            console.log(JSON.stringify(user));
            //$http.post('http://localhost:3000/signup', {username: user.username.toString(),
            $http.post('http://localhost:3000/api/signup', {firstName:user.fName.toString(),
                lastName:user.lName.toString(),
                emailAddress: user.username.toString(),
                password: user.password.toString(),
                //usertypeID is 1 for SA, 2 for Admin, and 3 for student
                userTypeID: user.type,
                universityID: user.university})
                .then( function(data){
                    if(data == 'existing'){
                        console.log("show message user already exists")

                    }else{
                        deferred.resolve(data);
                    }
                });
            return deferred.promise;
        };

    }]);
