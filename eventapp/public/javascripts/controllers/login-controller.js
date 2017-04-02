angular.module('app', ['userService','uniService'])
    .controller('LoginCtrl', ['$scope', 'userService', 'uniService', '$http', '$window', '$location',
         function LoginCtrl($scope, userService, uniService, $http, $window, $location) {
         
         $scope.login = function(user){
            console.log(user);
            if(typeof user == 'undefined' || (user.username.toString() == "" || user.password.toString() == "")){
                console.log("Hello");
                $scope.errorMessage = 'Please input both an Email Address and Password';
                return;
            }
            userService.login(user).then(function (data){
                 //console.log(data.data);
                 console.log("promise came back");
                console.log(data.data);
                console.log(typeof data.data);
                if(typeof data.data == 'string'){
                    $window.location.href = '';
                    //$scope.errorMessage = 'Username or Password is incorrect. NOTE: username and password are case sensitive';
                    alert('Username or Password is incorrect. Please Double check your password. Passwords are case-sensitive');
                    return;
                }
                else{
                    userService.setUserData(data.data);
                    $window.location.href = '/dashboard';
                }
             });
            //  var promise = userService.login(user);
            //  promise.then(function (data){
            //      //console.log(data.data);
            //      console.log("promise came back");
            //     console.log(data.data);
            //     if(data.data == "none"){
            //         $scope.errorMessage = 'Username or Password is incorrect. NOTE: username and password are case sensitive';
            //         return;
            //     }
            //     else{
            //         userService.setUserData(data.data);
            //         $window.location.href = '/dashboard';
            //     }
            //  });
             
         };

         $scope.createUser = function(user){
            //  console.log(JSON.stringify(user));
             user.type = 3;
            //  console.log("HELLO\n");
             console.log(JSON.stringify(user));
             var promise = userService.createUser(user);
             promise.then(function (data){
                 if(data.data == 'existing'){
                     console.log(data.data);
                     //user already exists, re route to login page, with error message;
                     $scope.errorMessage = 'Username: ' + user.username + ' already exists. Try a different email Address, or try to login if you already have an account.';
                 }
                 console.log(data.data);

                 $scope.login(data.data);

             });
         };

         $scope.signUp = function(){
             $window.location.href = '/signup';
         };

         //$scope.universities = getUniversities();

         $scope.universities = [];

         function getUniversities(){
             //Get universities from db. format with universityID and universityName
             var promise = uniService.getAllUniIds();
             promise.then(function(data){
                 console.log('mofo');
                 //console.log(data);
                 console.log(data.data);
                 $scope.universities = data.data;
             })
         }

         /*this.universities = */
         console.log($window.location.pathname)
         if($window.location.pathname == '/signup'){
             getUniversities();
         }
         //console.log(this.universities);

     }]);