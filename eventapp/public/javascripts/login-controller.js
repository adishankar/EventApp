angular.module('app', ['services'])
    .controller('LoginCtrl', ['$scope', 'userService', '$http', '$window', '$location',
         function LoginCtrl($scope, userService, $http, $window, $location) {
         
         $scope.login = function(user){

             var promise = userService.login(user);
             promise.then(function (data){
                 console.log(data);//this should be returned user data

                 userService.setUserData(data.data);

                 if (data.data.userID == 123){
                     console.log("verified user");
                     $window.location.href = '/dashboard';
                 }
             });
             
         };
     }]);