angular.module('app', ['userService', 'eventService'])
    .controller('DashCtrl', ['$scope', '$window', 'userService', 'eventService',
        function DashCtrl($scope, $window, userService, eventService) {
        
        $scope.orgs = orgs;
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            //var url = '../organization/organization.html'
            $window.location.href = url;
        }

        $scope.init = function(){

            eventService.testEvent();

            var user = userService.getUserData();
            console.log(user);
            $scope.name = user.username;
        }
        //event creation stuff
        $scope.master = {};

        $scope.save = function(event) {
            createdEvents.push(angular.copy(event));
            console.log(createdEvents);

            $scope.reset();
        };

        $scope.reset = function() {
            $scope.event = angular.copy($scope.master);
        };

        $scope.reset();

    }]);

    var orgs = [{name: "org1", description: "org1 description"},{name: "org2", description: "org2 description"},
        {name: "org3", description: "org3 description"},{name: "org4", description: "org4 description"}];
    
    var createdEvents = [];