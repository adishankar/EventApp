angular.module('app', ['userService','uniService'])
    .controller('LoginCtrl', ['$scope', 'userService', 'uniService', '$http', '$window', '$location',
         function LoginCtrl($scope, userService, uniService, $http, $window, $location) {
         
         $scope.login = function(user){
            console.log(user);
             var promise = userService.login(user);
             promise.then(function (data){
                console.log(data.data);

                userService.setUserData(data.data);
                $window.location.href = '/dashboard';

             });
         };

         $scope.createUser = function(user){
            //  console.log(JSON.stringify(user));
             user.type = 3;
            //  console.log("HELLO\n");
             console.log(JSON.stringify(user));
             var promise = userService.createUser(user);
             promise.then(function (data){
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