angular.module('app', ['userService'])
    .controller('LoginCtrl', ['$scope', 'userService', '$http', '$window', '$location',
         function LoginCtrl($scope, userService, $http, $window, $location) {
         
         $scope.login = function(user){

             var promise = userService.login(user);
             promise.then(function (data){
                console.log(data);

                userService.setUserData(data.data);
                $window.location.href = '/dashboard';

             });
         };

         $scope.createUser = function(user){
             var promise = userService.createUser(user);
             promise.then(function (data){
                 console.log(data.data);

                 $scope.login(data.data);

             });
         };

         $scope.signUp = function(){
             $window.location.href = '/signup';
         };

     }]);