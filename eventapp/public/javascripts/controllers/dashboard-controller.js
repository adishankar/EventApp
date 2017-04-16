angular.module('DashCtrl', ['userService', 'orgService', 'eventService'])
    .controller('DashCtrl', ['$scope', '$window', 'userService', 'orgService', 'eventService', 
        function DashCtrl($scope, $window, userService, orgService, eventService) {
        
        $scope.selectOrg = function(org){
            console.log(org);
            var url = '../rso/' + org.id.toString();
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
                var promise = orgService.getJoinedOrgs(user.userID);
                promise.then(function (data){
                    console.log(data.data);
                    if(data.data == "no results"){
                        $scope.error = "You have not joined any organizations!";
                    }else{
                        $scope.orgs = data.data;
                    }
                });
            };
    }]);
