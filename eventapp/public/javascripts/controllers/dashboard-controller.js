angular.module('DashCtrl', ['userService', 'orgService', 'eventService'])
    .controller('DashCtrl', ['$scope', '$window', 'userService', 'orgService', 'eventService', 
        function DashCtrl($scope, $window, userService, orgService, eventService) {
        
        $scope.init = function(){
            var user = userService.getUserData();
            console.log(user);
            $scope.name = user.username;
            $scope.orgs = orgs;
        }
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            $window.location.href = url;
        }
    }]);

    var orgs = [{name: "org1", description: "org1 description"},{name: "org2", description: "org2 description"},
        {name: "org3", description: "org3 description"},{name: "org4", description: "org4 description"}];
    
    var createdEvents = [];