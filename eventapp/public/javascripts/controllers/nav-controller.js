angular.module('NavCtrl', ['userService'])
    .controller('NavCtrl', ['$scope', '$window', 'userService', function NavCtrl($scope, $window, userService) {
        $scope.logout = function(){
            console.log("hey");
            userService.clearUser();
            var user = userService.getUserData();
            console.log(JSON.stringify(user));
            $window.location.href="/";
        };
    }]);