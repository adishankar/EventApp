angular.module('DashCtrl', ['userService', 'orgService', 'eventService'])
    .controller('DashCtrl', ['$scope', '$window', 'userService', 'orgService', 'eventService', 
        function DashCtrl($scope, $window, userService, orgService, eventService) {
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            $window.location.href = url;
        };

        $scope.init = function(){
                var user = userService.getUserData();
                console.log(JSON.stringify(user));
                $scope.name = user.firstName + ' ' + user.lastName;
// =======
//                 //console.log(user);
//                 $scope.name = user.username;
// >>>>>>> master
                var promise = orgService.getJoinedOrgs(user.userId);
                promise.then(function (data){
                    console.log(data.data);
                    $scope.orgs = data.data;
                });
            };
    }]);
